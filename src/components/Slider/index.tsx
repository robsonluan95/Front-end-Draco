import React, { useRef, useEffect } from 'react';
import Swiper from 'swiper';
import '../node_modules/swiper/swiper-bundle.min.css'; // Importe o arquivo de CSS diretamente
import styles from './styles.module.scss'; // Importe o arquivo de estilos CSS

const Slider = ({ marcas }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiper = new Swiper(swiperRef.current, {
      loop: true,
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      spaceBetween: 30,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

    return () => {
      swiper.destroy(); // Limpar quando o componente for desmontado
    };
  }, []); // Executa apenas uma vez ao montar o componente

  return (
    <div className={styles.swiperContainer}>
      <div ref={swiperRef} className={`swiper-container ${styles.swiperWrapper}`}>
        <div className="swiper-wrapper">
          {marcas?.map((marca) => (
            <div key={marca.id} className={`swiper-slide ${styles.slide}`}>
              <p className={styles.contentText}>{marca.name}</p>
            </div>
          ))}
        </div>
        <div className={`swiper-pagination ${styles.pagination}`} />
      </div>
    </div>
  );
};

export default Slider;
