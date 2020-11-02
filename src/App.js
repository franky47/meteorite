import React, {Component} from 'react';
import amplitude from 'amplitude-js';
import {Redirect, Router, Location, LocationProvider} from '@reach/router';
import {routes} from './constants';
import {AuthProvider} from './providers/Auth';
import {Home, Login, Pricing, Guide, NotificationsRedesign} from './pages';

// Initalize Amplitude for this session.
amplitude.init('752af9db0250fe93d507f42362a2977d');

function gtag() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

function gaTrack(options) {
  gtag('config', 'UA-154218045-1', options);
}

// Effectively track each new page.
function PageTracker({location}) {
  React.useEffect(
    () => {
      gaTrack({
        page_location: location,
        page_path: location.pathname
      });
    },
    [location]
  );

  return null;
}

function RedirectShell() {
  return <Redirect noThrow to={routes.NOTIFICATIONS} />;
}

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <LocationProvider>
          <Location>
            {({location}) => <PageTracker location={location} />}
          </Location>
          <Router>
            <Home path={routes.HOME} />
            <Login path={routes.LOGIN} />
            <Pricing path={routes.PRICING} />
            <Guide path={routes.GUIDE} />
            <RedirectShell path={routes.REDESIGN_NOTIFICATIONS} />
            <NotificationsRedesign path={routes.NOTIFICATIONS} />
          </Router>
        </LocationProvider>
      </AuthProvider>
    );
  }
}

export default App;
