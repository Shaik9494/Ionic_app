import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonText, IonButton } from '@ionic/react';
import React from 'react';
import {Swiper,SwiperSlide, useSwiper} from 'swiper/react'
import 'swiper/css';
import Logo from '../Assest/logo.png'
import './Intro.css'


interface ContainerProps{
    onFinish:()=>void;
}

const SwiperButtonNext=({children}:any)=>{
    const swiper=useSwiper();
    return <IonButton onClick={()=>swiper.slideNext()}>{children}</IonButton>
}

const Intro: React.FC<ContainerProps> = ({onFinish}) => {

    return (
        <Swiper>
            <SwiperSlide>
                <img src={Logo} alt="Intro" />
                <IonText>
                    <h3 style={{color:"#f1faee"}}>This is My First cross platform website</h3>
                </IonText>
                <IonButton onClick={()=>onFinish()}>Finish</IonButton>
            </SwiperSlide>
        </Swiper>
    );
};

export default Intro;