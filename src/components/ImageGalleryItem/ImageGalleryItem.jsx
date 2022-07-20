import {
  ImageGalleryItemSt,
  ImageGalleryItemImageSt,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ id, image, alt, onClick }) => {
  return (
    <ImageGalleryItemSt>
      <ImageGalleryItemImageSt
        id={id}
        src={image}
        alt={alt}
        onClick={onClick}
      />
    </ImageGalleryItemSt>
  );
};

export default ImageGalleryItem;
