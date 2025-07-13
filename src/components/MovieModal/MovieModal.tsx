import css from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface MovieModalProps {
  onClose: () => void;
  movie: Movie;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  //close with Backdrop
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  //close on "Escape" button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; //1)stop scroll background
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; //2)stop scroll background
    };
  }, [onClose]);

  //using  createPortal function for correct rendering in DOM
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        {movie.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
            className={css.image}
          />
        ) : movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
            className={css.image}
          />
        ) : (
          <div className={css.noImage}>Image not available</div>
        )}

        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong>
            {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong>
            {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
