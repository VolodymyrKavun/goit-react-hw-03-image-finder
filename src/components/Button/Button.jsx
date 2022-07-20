import { ButtonSt, ContainerBtn } from './Button.styled';
// import Loader from 'components/Loader';

const Button = ({ onClick }) => {
  return (
    <ContainerBtn>
      <ButtonSt onClick={onClick}>Load more</ButtonSt>
    </ContainerBtn>
  );
};

export default Button;
