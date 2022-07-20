import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import { AppSt } from './App.styled';
import Button from 'components/Button';
import Modal from 'components/Modal';
import * as ImageService from 'service/image-service';
import Loader from 'components/Loader';
import { showWarning } from '../../utils/toastMessage';
import ErrorImage from 'components/ErrorImage';

class App extends Component {
  state = {
    images: [],
    showModal: false,
    query: '',
    page: 1,
    isLoading: false,
    error: null,
    isEmpty: false,
    isVisible: false,
    largeImageURL: '',
  };

  componentDidUpdate = (_, prevState) => {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getPhotos(query, page);
    }
  };

  getPhotos = async (query, page) => {
    if (!query) return;
    this.setState({ isLoading: true });
    try {
      const { hits, total, totalHits } = await ImageService.getImages(
        query,
        page
      );

      if (hits.length === 0) {
        this.setState({ isEmpty: true });
        showWarning('Sorry. there are no images ... 😅');
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        isVisible: page < Math.ceil(total / totalHits),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  getBigPhoto = e => {
    const { images } = this.state;
    const id = e.target.id;
    const result = images.find(el => el.id === +id);
    this.setState({ largeImageURL: result.largeImageURL });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onSubmit = query => {
    this.setState({
      query,
      images: [],
      page: 1,
      isVisible: false,
      isEmpty: false,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      isVisible: false,
      page: prevState.page + 1,
    }));
  };

  render() {
    const {
      isEmpty,
      images,
      isVisible,
      showModal,
      error,
      isLoading,
      largeImageURL,
    } = this.state;

    return (
      <AppSt>
        <Searchbar onSubmit={this.onSubmit} />
        {error && `❌Something went wrong - ${error}`}
        {isEmpty && <ErrorImage />}

        <ImageGallery props={images} onClick={this.getBigPhoto}></ImageGallery>

        {largeImageURL && showModal && (
          <Modal onClose={this.toggleModal}>{largeImageURL}</Modal>
        )}
        {isLoading && <Loader />}
        {isVisible && <Button onClick={this.onLoadMore} onLoad={isLoading} />}
        <ToastContainer />
      </AppSt>
    );
  }
}

export default App;
