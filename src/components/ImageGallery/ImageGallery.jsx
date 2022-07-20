import { ImageGallerySt } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ props, onClick }) => {
  return (
    <>
      <ImageGallerySt>
        {props.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              image={webformatURL}
              alt={tags}
              onClick={onClick}
              id={id}
            ></ImageGalleryItem>
          );
        })}
      </ImageGallerySt>
    </>
  );
};

export default ImageGallery;
