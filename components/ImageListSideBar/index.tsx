import { useState }  from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image'
import Box from '@mui/material/Box';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';
import styledComponent from 'styled-components';
import Fab from '@mui/material/Fab';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface IProps {
  images: Array<string>;
}

const ImageContent = styledComponent.div`
  display: flex;

  @media only screen and (max-width: 900px) and (min-width: 600px) {

    width: 12rem;
    margin-right: 0;
  }
`;

const StyledArrowRight = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: '35%',
  left: 0,
  right: 5,
  margin: '0 0 0 auto',
});

const StyledArrowLeft = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: '35%',
  left: 5,
  right: 0,
  margin: '0 auto 0 0',
});

export default function ImageListComponent({ images }: IProps) {
  const [selected, setSelected] = useState(0);

  function handleSwitchImages(direction: string) {
    if(direction === 'left' && selected !== 0){
      setSelected(selected-1);
    }
    if(direction === 'right' && selected !== (images.length-1)){
      setSelected(selected+1);
    }
  }

  return (
    <>
      <Box sx={{ width: 100, height: 600, overflowY: 'scroll', m: 1, display: { xs: 'none', md: 'none', lg: 'block' } }}>
        <ImageList
          sx={{
            width: 100,
            height: 'auto',
            // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
            transform: 'translateZ(0)',
          }}
          rowHeight={100}
          style={{cursor: 'pointer' }}
          cols={1}
        >
          {images.map((imageSrc , index) => (
              <ImageListItem 
                key={imageSrc} 
                cols={1} 
                rows={1} 
                onClick={()=> setSelected(index)}
              >
                <Image
                  src={imageSrc}
                  layout="fill"
                  height={100}
                  width={100}
                  alt="Imagem do produto"
                />
              </ImageListItem>
          ))}
        </ImageList>
      </Box>
      
      <Box position={'relative'} sx={{width: {xs: 600, md: 450, lg: 600 }, mx: {md: 'auto'}}}>
        <Image src={images[selected]} width={600} height={600} alt="Imagem do produto" />
          <StyledArrowRight
            aria-label="arrow"
            size="small"
            onClick={()=>handleSwitchImages("right")}
          >
            <ArrowForwardIosIcon />
          </StyledArrowRight>
        
          <StyledArrowLeft
            aria-label="arrow"
            size="small"
            onClick={()=>handleSwitchImages("left")}
          >
            <ArrowBackIosNewIcon />
          </StyledArrowLeft>
      </Box>
    </>
  );
}
