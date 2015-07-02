  ;
  (function(win, lib) {
      var doc = document;
      var _test = doc.getElementById('test');
      // (function() {
      //   var proxied = window.alert;
      //   window.alert = function() {
      //     // do something here
      //     return proxied.apply(this, arguments);
      //   };
      // })();
      // function listener() {
      //     var now = new Date().valueOf();
      //     setTimeout(function () {
      //         if (new Date().valueOf() - now > 100) return;
      //         console.log('no');
      //         window.location = "https://itunes.apple.com/us/app/flipagram/id512727332?mt=8";
      //     }, 25);
      //     try{
      //         window.location = "yiyi://";
      //         // window.open("yiyi://", '_blank');
      //     }catch(e){
      //         console.log(e);
      //     };
      //     // window.location = "twitter://post?message=";
      // }
      // _test.addEventListener('click' , listener);
      var redirect = function(location) {
          var iframe = document.createElement('iframe');
          iframe.setAttribute('src', location);
          iframe.setAttribute('target', '_blank');
          iframe.setAttribute('width', '1px');
          iframe.setAttribute('height', '1px');
          iframe.setAttribute('position', 'absolute');
          iframe.setAttribute('top', '0');
          iframe.setAttribute('left', '0');
          document.documentElement.appendChild(iframe);
          iframe.parentNode.removeChild(iframe);
          iframe = null;
      };
      var hidden, state, visibilityChange;
      if (typeof document.hidden !== "undefined") {
          hidden = "hidden";
          visibilityChange = "visibilitychange";
          state = "visibilityState";
      } else if (typeof document.mozHidden !== "undefined") {
          hidden = "mozHidden";
          visibilityChange = "mozvisibilitychange";
          state = "mozVisibilityState";
      } else if (typeof document.msHidden !== "undefined") {
          hidden = "msHidden";
          visibilityChange = "msvisibilitychange";
          state = "msVisibilityState";
      } else if (typeof document.webkitHidden !== "undefined") {
          hidden = "webkitHidden";
          visibilityChange = "webkitvisibilitychange";
          state = "webkitVisibilityState";
      }
      // Add a listener that constantly changes the title
      // document.addEventListener(visibilityChange, function() {
      //     console.log(document[state]);
      // }, false);
      function checkVisibility() {
          if (document[state] == 'hidden') {
              return false;
          } else if (document[state] == 'visible') {
              return true;
          };
      }

      function lis() {
          var timerID;
          timerID = setTimeout(function() {
              if (checkVisibility()) {
                  window.confirm("sometext");
                  // window.location = "https://itunes.apple.com/us/app/flipagram/id512727332?mt=8";
                  // redirect('https://itunes.apple.com/us/app/flipagram/id512727332?mt=8');
                  console.log('no');
              };
              clearTimeout(timerID);
          }, 25);
          redirect('twitter://');
      }
      _test.addEventListener('click', lis);
  })(window, window['lib'] || (window['lib'] = {}));