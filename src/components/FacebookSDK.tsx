import { useEffect } from 'react';

export const FacebookSDK = () => {
    useEffect(() => {
        if (document.getElementById('facebook-jssdk')) return;

        // @ts-ignore
        window.fbAsyncInit = function () {
            // @ts-ignore
            window.FB.init({
                appId: '1954763168413810',
                cookie: true,
                xfbml: true,
                version: 'v21.0'
            });
        };

        (function (d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s) as HTMLScriptElement; js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode?.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }, []);

    return null;
};
