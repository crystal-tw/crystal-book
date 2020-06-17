/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/conventions/coding_style.html","c04c5e27ca7918db6c196450cebf2a0d"],["/conventions/documenting_code.html","861f042c4fb952fc2bf4292b1a22d481"],["/conventions/index.html","dfc8ec504f42c6f55983c3d54ee89f0d"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","9b08c89eb350d879fb29c89c3b2a9169"],["/database/connection_pool.html","fa043dd5ef588fdcd2c7b3f1fe68bb8e"],["/database/index.html","0fe680a8cc533504683947b55c6aed48"],["/database/transactions.html","937c79c5211c4c3b4323bfb8f10d1f36"],["/getting_started/cli.html","303c8d5f371224c1f3d4c7b6c8c25579"],["/getting_started/http_server.html","b498e26b6f2314d519174ca494fc42da"],["/getting_started/index.html","75b341ebd024e5decece88079c46da16"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-ga/plugin.js","8b0d0bfffa07cfd2675fffb1b7b6e6f4"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","3f794d0026ec92af1a6b1119d79ef070"],["/guides/ci/travis.html","efd6e4bd2eddf2150e976299386299b5"],["/guides/concurrency.html","f788870df9a10cd1e9039b433eb60b49"],["/guides/continuous_integration.html","9c46b6e73149402dee7714b8d31d0cbe"],["/guides/hosting/github.html","141c3d57c4eaa4157c54c85520137964"],["/guides/hosting/gitlab.html","3828b98fc6786202121c81e6d898c781"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","c3ae8b9d8015f1c3a9c381e1e0bdbe8a"],["/guides/performance.html","be482aa0f6f8d3367e34a3f625f8474a"],["/guides/testing.html","a17ead03291312f763705de84b58ff63"],["/guides/writing_shards.html","f53200c5ea5c675186ba7b8561c718ff"],["/index.html","b1b22f18269e4f97dbdfe3edeee68789"],["/styles/website.css","b705256791cb7823862fe16701427964"],["/syntax_and_semantics/alias.html","cdfae298db52d8bcee308a19e13c23de"],["/syntax_and_semantics/and.html","b1d0ce0ee99b62b4d466817a30347cfd"],["/syntax_and_semantics/annotations.html","f426dcf2ece2fa8dda5211b3e189cd38"],["/syntax_and_semantics/annotations/built_in_annotations.html","fd29a10dbf5af22d54296ebaeb5eef16"],["/syntax_and_semantics/as.html","73849e3b438bbfc4d912899ef23e8380"],["/syntax_and_semantics/as_a_suffix.html","acf75c58ea2e6612cd70f4cfe9a20506"],["/syntax_and_semantics/as_an_expression.html","6da341d0fecc54e9258ace9a936a05fd"],["/syntax_and_semantics/as_question.html","821bffe61d857dd92f68524d7f02ba44"],["/syntax_and_semantics/assignment.html","764c7dccad75bb8e93d1ecfdb936f29c"],["/syntax_and_semantics/block_forwarding.html","1214c873c439c85dd6c2a6e02388c3af"],["/syntax_and_semantics/blocks_and_procs.html","07142d040f0189bdda3b328148a7e679"],["/syntax_and_semantics/break.html","d8c5a48c0662af62dc104efa6dd24e89"],["/syntax_and_semantics/c_bindings/alias.html","49fc6c3e229b6c0884b3d5d4f8270597"],["/syntax_and_semantics/c_bindings/callbacks.html","bc769dc2fa8e1564c1ccb9931f2ba1fe"],["/syntax_and_semantics/c_bindings/constants.html","f0bc2e1296c8318fe3e7bf4be6b65f9b"],["/syntax_and_semantics/c_bindings/enum.html","62152bf6501e5190e4f35a3ab5e131ee"],["/syntax_and_semantics/c_bindings/fun.html","b733b61584479dd0d17a2895b88d8521"],["/syntax_and_semantics/c_bindings/index.html","3ec98017db3b50d06e7d5714e1d99e71"],["/syntax_and_semantics/c_bindings/lib.html","44b8d57ec8b88c2ed6543d2bc2c8f6e9"],["/syntax_and_semantics/c_bindings/out.html","e551cd8d934e7c1fe0541f9227bc5f19"],["/syntax_and_semantics/c_bindings/struct.html","c39c33ac4cb9443bbd23e265c68507c8"],["/syntax_and_semantics/c_bindings/to_unsafe.html","f6ee59b7ff53df41956b724c49a17dd7"],["/syntax_and_semantics/c_bindings/type.html","f6f8668e72a4ac4bc8fa8e2869accc39"],["/syntax_and_semantics/c_bindings/union.html","bde562b42198027112690dc7041ffb1e"],["/syntax_and_semantics/c_bindings/variables.html","5f9a9b2005486bc8186e9047756d3d00"],["/syntax_and_semantics/capturing_blocks.html","e43413903cb9202298c2c1373477b928"],["/syntax_and_semantics/case.html","45116a33b48c3bb4be7b28ff1a3d88cb"],["/syntax_and_semantics/class_methods.html","9ab58d5901a4775fa1f2d503ca86f186"],["/syntax_and_semantics/class_variables.html","821f6405f0e32d9111b3470a3f90145d"],["/syntax_and_semantics/classes_and_methods.html","1ce5aa6519602916fc79d3d55a32c123"],["/syntax_and_semantics/closures.html","43fcb74ed26cd1f2cdf40d93eb2dad56"],["/syntax_and_semantics/comments.html","f61733b3852a586b2e298acc4137d659"],["/syntax_and_semantics/compile_time_flags.html","74e7f559e035e4412e148b4b428e817c"],["/syntax_and_semantics/constants.html","dab13dd06acf2f3137476bdf5465006f"],["/syntax_and_semantics/control_expressions.html","a7d381afb54ce61f939c7a53455598f6"],["/syntax_and_semantics/cross-compilation.html","baadae47d5fac9a606877daf1f1c31ec"],["/syntax_and_semantics/declare_var.html","3d14e3c5a2579acab26d2c76bd0ce1ab"],["/syntax_and_semantics/default_and_named_arguments.html","56124ea28e67bc99012edd743d1bf32d"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","96949b6634d57e489d9e7263f858faa9"],["/syntax_and_semantics/enum.html","76d41e6cf677e19554b359c3867d4df7"],["/syntax_and_semantics/everything_is_an_object.html","3f7194ceacbdee90aa94282468eab6bf"],["/syntax_and_semantics/exception_handling.html","d7e37e19581c9f7b1b7dccda8235cbf7"],["/syntax_and_semantics/finalize.html","5c1af9394dd889c0e286da6ce8f28946"],["/syntax_and_semantics/generics.html","bc64cf617e6eae54ed6207ed71010fa9"],["/syntax_and_semantics/if.html","3112cff96eac7def75403855f6a2fcd2"],["/syntax_and_semantics/if_var.html","0721b3fcc4e8ce9ca72e582e14dc3a1b"],["/syntax_and_semantics/if_var_nil.html","5a729759ef68b722d256c4a98183ba55"],["/syntax_and_semantics/if_varis_a.html","161293f18f8c1a19669e07858a7ab0ad"],["/syntax_and_semantics/if_varresponds_to.html","7912ad382c30e072d6526aaaaa1af445"],["/syntax_and_semantics/index.html","4881749eea36ab21f8347c157cb96d9b"],["/syntax_and_semantics/inheritance.html","bc6e5476641db441da09c4386304354e"],["/syntax_and_semantics/instance_sizeof.html","eb2abe809d607fbabb1c4e958100b37b"],["/syntax_and_semantics/is_a.html","d523f4bf9fef4d6f5c6f47d1b7c580ec"],["/syntax_and_semantics/literals.html","9bea2edabfd324285395c7b4b4ee5ede"],["/syntax_and_semantics/literals/array.html","a0b422020e697bda1ae83ddf10ead659"],["/syntax_and_semantics/literals/bool.html","e8b1820a78ac8309003068f50dc59557"],["/syntax_and_semantics/literals/char.html","09878615cec0e3bfcf18080191fac773"],["/syntax_and_semantics/literals/floats.html","f8a40e8105da917f4b9b8f924a9e6707"],["/syntax_and_semantics/literals/hash.html","4ed6327ea3d7b914f34c91c0aa2eeab8"],["/syntax_and_semantics/literals/integers.html","0e922f0cbb784bceda99aba97a700372"],["/syntax_and_semantics/literals/named_tuple.html","e56bfb58a05ff4402e405a106808577d"],["/syntax_and_semantics/literals/nil.html","179f7ecbe1127bc876e4e9c7fcac77e8"],["/syntax_and_semantics/literals/proc.html","99c0cbb78f3a1b86d26043c80ad909a3"],["/syntax_and_semantics/literals/range.html","0e546d050f15dde7ee23d5744c1d32b8"],["/syntax_and_semantics/literals/regex.html","d77895f729e79d8687eda681209f0e29"],["/syntax_and_semantics/literals/string.html","207232d6ec148a22d609ad46c8b82d92"],["/syntax_and_semantics/literals/symbol.html","3912f13143b17600f1f816c1150170d5"],["/syntax_and_semantics/literals/tuple.html","a4115d935d02f5a1074fdefd2bebf1f0"],["/syntax_and_semantics/local_variables.html","47b3e4da44a6db810ae7fe7d9a320afb"],["/syntax_and_semantics/low_level_primitives.html","6f35bb79f27ef617eee48616165680a4"],["/syntax_and_semantics/macros.html","560108c814606ae83aebfb84052f89df"],["/syntax_and_semantics/macros/fresh_variables.html","9bdbbccf2bbf9020e632458334d82502"],["/syntax_and_semantics/macros/hooks.html","097796d164ec794cb29b5b7e4c31ec94"],["/syntax_and_semantics/macros/macro_methods.html","cdf9eccbf675330c42bd9e375f6dd6d9"],["/syntax_and_semantics/methods_and_instance_variables.html","69a27f6351055fbdf58b236f6ab7dce7"],["/syntax_and_semantics/modules.html","c6f7f08a15f3df22e651da4196136bbe"],["/syntax_and_semantics/new_initialize_and_allocate.html","363541351ebaff40a90b559ef8aeca57"],["/syntax_and_semantics/next.html","29ee27d26c47c04400fd822149616c4f"],["/syntax_and_semantics/nil_question.html","a43d365d76a40d4baf031fae429906c6"],["/syntax_and_semantics/not.html","2b692c2fd0086217f37b69cf0ca8ede7"],["/syntax_and_semantics/offsetof.html","a0abdbb87965c5c66e45a25ee0b620e5"],["/syntax_and_semantics/operators.html","fd41657e30f71eb9275ad00ea08878b6"],["/syntax_and_semantics/or.html","60886df3c33eef84d7c6548348df8f4f"],["/syntax_and_semantics/overloading.html","3afc0b2ba0ae04ed5d61203a963ac099"],["/syntax_and_semantics/pointerof.html","90ed17c31c36853fa9f8a1549a361846"],["/syntax_and_semantics/proc_literal.html","5bea4bd721e7de922cf8063a7550da86"],["/syntax_and_semantics/requiring_files.html","d07ad64188af54ad6f7b6c828b073624"],["/syntax_and_semantics/responds_to.html","c8da7e31167fe9c8d8c7c3e44ab6fa35"],["/syntax_and_semantics/return_types.html","6e1a943f0e8ad5c38c7fd5e76e12d4f9"],["/syntax_and_semantics/sizeof.html","c73ff40b01824d7f41b6e48ece081daa"],["/syntax_and_semantics/splats_and_tuples.html","81e00a579f00cb41cbf946e8b03d695e"],["/syntax_and_semantics/structs.html","e2c30d8a4b6b4a704c204fb485461704"],["/syntax_and_semantics/ternary_if.html","5aee3c9f591f354b39ca5868ee5bf312"],["/syntax_and_semantics/the_program.html","ace29b3ec945e2477b83ed82fff1f0de"],["/syntax_and_semantics/truthy_and_falsey_values.html","726faee79bbc8086617637ddbc78ab59"],["/syntax_and_semantics/type_grammar.html","a6119e94bfcdef3cbde23b495b875f67"],["/syntax_and_semantics/type_inference.html","70980d46410f3dd2cd9a8e76ff3186b6"],["/syntax_and_semantics/type_reflection.html","05e74b4144a3758f0e8f5c878873d9f2"],["/syntax_and_semantics/type_restrictions.html","7d4404167e89265a85649c217c1771d3"],["/syntax_and_semantics/typeof.html","0959bc4b73d9accedc95787061e678ee"],["/syntax_and_semantics/types_and_methods.html","db91e54fa530fa5dbd6df47a8f54abb1"],["/syntax_and_semantics/union_types.html","483e6a058a19d5baafa0ff1df9091ace"],["/syntax_and_semantics/unless.html","04fb4548494f3b9286d3dbdb3b789ff8"],["/syntax_and_semantics/unsafe.html","3386357d634b795ae13d7cb2d45705c8"],["/syntax_and_semantics/until.html","3dc5978b900d14014da259fbb1a558cf"],["/syntax_and_semantics/virtual_and_abstract_types.html","80ac8934d0e89df4f3fd311cb782590a"],["/syntax_and_semantics/visibility.html","a814136689d99099fa0d535b1813209d"],["/syntax_and_semantics/while.html","f81d4b47163d1135df59aef49a3bdb77"],["/the_shards_command/index.html","d386dde160aae375d41df12b3a5e4924"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","70d56226e2b650832e6b793b8edbaafd"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







