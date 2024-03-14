import { IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonMenuButton, IonPage, IonRouterOutlet, IonTab, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Redirect, Route, useLocation } from 'react-router';
import Tab from './Tab';
import Tab1 from './Tab1';
import { IonReactRouter } from '@ionic/react-router';
import { menuOutline, triangle, videocamOutline } from 'ionicons/icons';

const Settings: React.FC = () => {
    const location = useLocation();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'success'}>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                UI goes here...
            </IonContent>
            <IonTabs>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="tab" href="/app/settings/tab" selected={location.pathname === '/app/settings/tab'}>
                        <IonIcon icon={triangle} />
                        <IonLabel>Animation</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="list" href="/app/settings/tab1" selected={location.pathname === '/app/settings/tab1'}>
                        <IonIcon icon={videocamOutline} />
                        <IonLabel>Camera</IonLabel>
                    </IonTabButton>
                </IonTabBar>
                <IonRouterOutlet>
                    <Route path="/app/settings/tab" component={Tab} />
                    <Route path="/menu/list" component={Tab1} />
                </IonRouterOutlet>
            </IonTabs>
        </IonPage>
    );
};

export default Settings;
