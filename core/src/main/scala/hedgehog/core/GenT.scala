package hedgehog.core

import hedgehog._
import hedgehog.predef._

/**
 * Generator for random values of `A`.
 */
case class GenT[M[_], A](run: (Size, Seed) => Tree[M, (Seed, Option[A])]) {

  def map[B](f: A => B)(implicit F: Functor[M]): GenT[M, B] =
    GenT((size, seed) => run(size, seed).map(t => t.copy(_2 = t._2.map(f))))

  def flatMap[B](f: A => GenT[M, B])(implicit F: Monad[M]): GenT[M, B] =
    GenT((size, seed) => run(size, seed).flatMap(x =>
      x._2.fold(Tree.TreeApplicative(F).point(x.copy(_2 = Option.empty[B])))(a => f(a).run(size, x._1))
    ))

  def mapTree[N[_], B](f: Tree[M, (Seed, Option[A])] => Tree[N, (Seed, Option[B])]): GenT[N, B] =
    GenT((size, seed) => f(run(size, seed)))

  /**********************************************************************/
  // Shrinking

  /**
   * Apply a shrinking function to a generator.
   */
  def shrink(f: A => List[A])(implicit F: Monad[M]): GenT[M, A] =
    mapTree(_.expand(x =>
      x._2.fold(List.empty[(Seed, Option[A])])(a => f(a).map(y => (x._1, Some(y))))
    ))

  /**
   * Throw away a generator's shrink tree.
   */
  def prune(implicit F: Monad[M]): GenT[M, A] =
    mapTree(_.prune)

  /**********************************************************************/
  // Combinators - Property

  def log(name: Name)(implicit F: Monad[M]): PropertyT[M, A] =
    for {
      x <- propertyT.fromGen(this)
      // TODO Add better render, although I don't really like Show
      _ <- propertyT[M].writeLog(ForAll(name, x.toString))
    } yield x

  /**********************************************************************/
  // Combinators - Size

  /**
   * Override the size parameter. Returns a generator which uses the given size
   * instead of the runtime-size parameter.
   */
  def resize(size: Size): GenT[M, A] =
    if (size.value < 0)
      sys.error("Hedgehog.Random.resize: negative size")
    else
      GenT((_, seed) => run(size, seed))

  /**
   * Adjust the size parameter by transforming it with the given function.
   */
  def scale(f: Size => Size): GenT[M, A] =
    genT.sized(n => resize(f(n)))

  /**
   * Make a generator smaller by scaling its size parameter.
   */
  def small: GenT[M, A] =
    scale(_.golden)

  /**********************************************************************/
  // Combinators

  def list(range: Range[Int])(implicit F: Monad[M]): GenT[M, List[A]] =
    // TODO filterM, needs a MonadPlus for Gen
    genT[M].integral_[Int](range).flatMap(k => replicateM[GenT[M, ?], A](k, this))
      .shrink(Shrink.list)
}

abstract class GenImplicits1 {

  implicit def GenFunctor[M[_]](implicit F: Functor[M]): Functor[GenT[M, ?]] =
    new Functor[GenT[M, ?]] {
      override def map[A, B](fa: GenT[M, A])(f: A => B): GenT[M, B] =
        fa.map(f)
    }
}

abstract class GenImplicits2 extends GenImplicits1 {

  implicit def GenApplicative[M[_]](implicit F: Monad[M]): Applicative[GenT[M, ?]] =
    new Applicative[GenT[M, ?]] {
      def point[A](a: => A): GenT[M, A] =
        GenT((_, s) => Tree.TreeApplicative(F).point((s, Some(a))))
      def ap[A, B](fa: => GenT[M, A])(f: => GenT[M, A => B]): GenT[M, B] =
        for {
          ab <- f
          a <- fa
        } yield ab(a)
    }
}

object GenT extends GenImplicits2