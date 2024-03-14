import { Camera, CameraResultType } from '@capacitor/camera';
import { IonContent, IonHeader,IonButtons, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import React, { useState } from 'react';

const Tab1: React.FC = () => {
    const [img, setImg] = useState<any>(null);
    const takepic=async()=>{
        const img=await Camera.getPhoto({
            quality:90,
            allowEditing:false,
            resultType:CameraResultType.Base64
        })
        const image=`data:image/jprg;base64,${img.base64String}`;
        setImg(image)
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'success'}>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>Camera</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonButton expand="full" onClick={takepic}>Take Picture</IonButton>
                <img src={img} alt=""/>
            </IonContent>
        </IonPage>
    );
};

export default Tab1;