import React, { useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import ModeContext from '../contexts/mode';

interface CardProps {
  imgUrl: string;
  name: string;
  population: string;
  region: string;
  capital: string;
}

const Card: React.FC<CardProps> = ({
  imgUrl,
  name,
  population,
  region,
  capital,
}: CardProps) => {
  const mode = useContext(ModeContext);
  const [flipped, setFlipped] = useState(false);

  const toggleFlip = () => {
    setFlipped((flipped) => !flipped);
  };

  return (
    <FlipCard onClick={toggleFlip}>
      <InnerCardContainer flipped={flipped} mode={mode}>
        <CardFront mode={mode}>
          <img src={imgUrl} alt={name}></img>
          <div>
            <h3>{name}</h3>
            <p>
              <b>Population: </b> {population}
            </p>
            <p>
              <b>Region: </b> {region}
            </p>
            <p>
              <b>Capital: </b> {capital}
            </p>
          </div>
        </CardFront>
        <CardBack mode={mode}>
          <div>BACK</div>
        </CardBack>
      </InnerCardContainer>
    </FlipCard>
  );
};

export default Card;

// Styled component
interface CardSideProps {
  mode: string;
}

interface InnerCardContainerProps {
  mode: string;
  flipped: boolean;
}

const InnerCardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  border-radius: 5px;

  ${({ mode = 'light' }: InnerCardContainerProps) =>
    mode === `light`
      ? `
    color: black;
    box-shadow: 0 0 8px #d9d9d9;
    `
      : `
    color: white;
    box-shadow: 0 0 8px #1D2A36;
  `};

  ${({ flipped = true }: InnerCardContainerProps) =>
    flipped === true
      ? `
      transform: rotateY(180deg);
      `
      : ``};
`;

const FlipCard = styled.div`
  background-color: transparent;
  margin: 2%;
  width: 250px;
  height: 380px;
  perspective: 1000px;
  border-radius: 5px;
`;

const CardFront = styled.div`
  backface-visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 5px;

  & div {
    margin: 5% 0;
    padding: 10%;
  }

  & img {
    max-width: 250px;
    border-radius: 5px 5px 0 0;
  }

  ${({ mode = 'light' }: CardSideProps) =>
    mode === `light`
      ? `
    background-color: white;
    color: black;
    `
      : `
    background-color: #324354;
    color: white;
  `};
`;

const CardBack = styled.div`
  backface-visibility: hidden;
  transform: rotateY(180deg);
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 5px;

  & div {
    margin: 5% 0;
    padding: 10%;
  }

  ${({ mode = 'light' }: CardSideProps) =>
    mode === `light`
      ? `
    background-color: white;
    color: black;
    `
      : `
    background-color: #324354;
    color: white;
  `};
`;
