import React, { useEffect, useState, useRef } from 'react';
import './HeroSection.css';
import featuredImage from '../Images/featured-products.png';
import hoodiesImage from '../Images/hoodie.png';
import tshirtsImage from '../Images/t-shirts.png';

const images = [featuredImage, hoodiesImage, tshirtsImage];

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(1); // Start from the first real image
    const [isTransitioning, setIsTransitioning] = useState(false);
    const slideshowRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        if (currentIndex === images.length) {
            setIsTransitioning(false);
            setCurrentIndex(1);
            setTimeout(() => {
                setIsTransitioning(true);
                setCurrentIndex(2);
            }, 20);
        } else {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex === 1) {
            setIsTransitioning(false);
            setCurrentIndex(images.length);
            setTimeout(() => {
                setIsTransitioning(true);
                setCurrentIndex(images.length - 1);
            }, 20);
        } else {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleTransitionEnd = () => {
        if (currentIndex === 0) {
            setIsTransitioning(false);
            setCurrentIndex(images.length);
        } else if (currentIndex === images.length + 1) {
            setIsTransitioning(false);
            setCurrentIndex(1);
        }
    };

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        xDown = touch.clientX;
        yDown = touch.clientY;
    };

    const handleTouchMove = (e) => {
        if (!xDown || !yDown) {
            return;
        }

        const xUp = e.touches[0].clientX;
        const yUp = e.touches[0].clientY;

        const xDiff = xDown - xUp;
        const yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        xDown = null;
        yDown = null;
    };

    let xDown = null;
    let yDown = null;

    return (
        <div className="hero-section">
            <div className="slideshow-container" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                <div
                    className={`slides-wrapper ${isTransitioning ? 'transition' : ''}`}
                    ref={slideshowRef}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    <div className="slide">
                        <img src={images[images.length - 1]} alt="Slide 0" />
                    </div>
                    {images.map((image, index) => (
                        <div className="slide" key={index}>
                            <img src={image} alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                    <div className="slide">
                        <img src={images[0]} alt="Slide end" />
                    </div>
                </div>
                <a className="prev" onClick={prevSlide}>&#10094;</a>
                <a className="next" onClick={nextSlide}>&#10095;</a>
            </div>
            <br />
            <div style={{ textAlign: 'center' }}>
                {images.map((_, index) => (
                    <span key={index} className={`dot${currentIndex - 1 === index ? ' active' : ''}`}></span>
                ))}
            </div>
        </div>
    );
};

export default HeroSection;
