import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router';
import List from './List';
import Settings from './Settings';
import { homeOutline, settingsOutline, exitOutline } from 'ionicons/icons';

const Menu: React.FC = () => {

    const paths = [
        { name: 'Home', url: '/menu/list', icon: homeOutline },
        { name: 'settings', url: '/menu/settings', icon: settingsOutline },
    ]

    return (
        <IonPage>
            <IonMenu contentId='main'>
                <IonHeader>
                    <IonToolbar color={'primary'}>
                        <IonTitle>Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className='ion-padding'>
                    {paths.map((item, index) => (
                        <IonMenuToggle key={index}>
                            <IonItem detail={false} routerLink={item.url} key={index} routerDirection='none'>
                                <IonIcon slot="start" icon={item.icon}></IonIcon>
                                {item.name}
                            </IonItem>
                        </IonMenuToggle>
                    ))}
                </IonContent>
                <IonMenuToggle>
                    <IonButton expand="full" style={{width:'100%'}} routerLink='/' routerDirection='root' color='danger'>
                        <IonIcon slot="start" icon={exitOutline} ></IonIcon>
                        Logout
                    </IonButton>
                </IonMenuToggle>
            </IonMenu>
            <IonRouterOutlet id='main'>
                <Route exact path="/menu/list" component={List}></Route>
                <Route path="/menu/settings" component={Settings}></Route>
                <Route exact path="/menu">
                    <Redirect to="/menu/list" />
                </Route>
            </IonRouterOutlet>
        </IonPage>
    );
};

export default Menu;