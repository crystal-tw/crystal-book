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

var precacheConfig = [["/conventions/coding_style.html","f5be99764e910cc3e80a08bb972629e5"],["/conventions/documenting_code.html","872d7e423c71d15f50e01b9ab8520f19"],["/conventions/index.html","99924ddc4f85cd11abc7326c1414cb21"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","a31f293981fe0cbba2415de9fc1269a1"],["/database/connection_pool.html","a29b1a6e3c4c2941311acedd66520381"],["/database/index.html","dbcff6d51f77a9b859c5a3d8be0aea5f"],["/database/transactions.html","cfff5049f3b46e09288fde79abae569a"],["/getting_started/cli.html","b1abdeb30c36dea105251fd63073fa4f"],["/getting_started/http_server.html","9bb753967ec0a501c8ee05a1ff785eb2"],["/getting_started/index.html","544cba8abb04577c7d4ed0bf8be4951d"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-ga/plugin.js","8b0d0bfffa07cfd2675fffb1b7b6e6f4"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","6ae2ea316657593ab8f14120135e59fe"],["/guides/ci/travis.html","75ef7005568671fb9c538cb6e6104243"],["/guides/concurrency.html","754625db646b6a9e5cf9a2104f567377"],["/guides/continuous_integration.html","af6a03e8dbbf2c873bd72f8d4312c465"],["/guides/hosting/github.html","a7a2d64d245ef9b56de9b4b4c6ee70e3"],["/guides/hosting/gitlab.html","a80c86ba0621e7791b9876618a84f42a"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","5000932aa53d63346ff70ddf6db3dcfa"],["/guides/performance.html","30f117e0834c28f6d9322a1b3fa57293"],["/guides/testing.html","d422e614aaf8aa6716add329f26236e1"],["/guides/writing_shards.html","034aae085eee26d8cc02a7f84e581070"],["/index.html","34d504ffc814e78e56c95c8d8bc1ccae"],["/styles/website.css","b705256791cb7823862fe16701427964"],["/syntax_and_semantics/alias.html","aceda91dadaa9a9287609914e8e87e86"],["/syntax_and_semantics/and.html","79de57f784a56512e61c163c3ebbd604"],["/syntax_and_semantics/annotations.html","1c3a40b3d312b11907cd3f889013d46b"],["/syntax_and_semantics/annotations/built_in_annotations.html","7b3183c14e85210c0fce53475330fbae"],["/syntax_and_semantics/as.html","73c3f7e088f41110f022b0eb6c218ae6"],["/syntax_and_semantics/as_a_suffix.html","5d2711fdbb860077b04a9b2d80419487"],["/syntax_and_semantics/as_an_expression.html","1323ec6e995e64dbcbaf8a6a8677f935"],["/syntax_and_semantics/as_question.html","4079e7f46d2c4a597ed3150c552fcce7"],["/syntax_and_semantics/assignment.html","9726c6e478b0eb2d044416f267908594"],["/syntax_and_semantics/block_forwarding.html","295babf26143677d06ab4d5585ff9d94"],["/syntax_and_semantics/blocks_and_procs.html","eee1404081595b0e3f447c8c36970855"],["/syntax_and_semantics/break.html","7ba8e2d1e5790abc858ad6a0eed4fa0f"],["/syntax_and_semantics/c_bindings/alias.html","f238f16ab372f60e7535f6ebf0bd6232"],["/syntax_and_semantics/c_bindings/callbacks.html","eac8e7a84291750359f2a16ec6f4876f"],["/syntax_and_semantics/c_bindings/constants.html","4e87fbcf32a32f64176c433282139861"],["/syntax_and_semantics/c_bindings/enum.html","bd2792f2af74867794d2c598aecc4e19"],["/syntax_and_semantics/c_bindings/fun.html","050170dcea47094672062fc3eee6c9cc"],["/syntax_and_semantics/c_bindings/index.html","3d934cd1b7408534863d2a40f2ad0570"],["/syntax_and_semantics/c_bindings/lib.html","f934936c753ce28a07b8356923a44b67"],["/syntax_and_semantics/c_bindings/out.html","b5c17c7c15e276f081a6b70471620f15"],["/syntax_and_semantics/c_bindings/struct.html","51563e80ff80bbb028bad9843a18b211"],["/syntax_and_semantics/c_bindings/to_unsafe.html","b99bfc2a93c68d52db3104c5317b8551"],["/syntax_and_semantics/c_bindings/type.html","dd9180a892fc1295737cbbc84a214d24"],["/syntax_and_semantics/c_bindings/union.html","ea21c24ced4cecfa78c4ba25638f811e"],["/syntax_and_semantics/c_bindings/variables.html","e55a7c497d24686a2f316d1cb029a1f9"],["/syntax_and_semantics/capturing_blocks.html","e34ccf906c03e0607eb7605e649fb832"],["/syntax_and_semantics/case.html","0954c205c91b63be2710fbf76707e792"],["/syntax_and_semantics/class_methods.html","8622adfab74a926c678e9d211289561a"],["/syntax_and_semantics/class_variables.html","7c7a4c133deff6535346238915334f7b"],["/syntax_and_semantics/classes_and_methods.html","2f00560eb1b9a180619d0a40aa2d1138"],["/syntax_and_semantics/closures.html","4de2cd74200be5c008caea0f75a1e5b0"],["/syntax_and_semantics/comments.html","f62cd39a5b0a1470d7aeae8420a9e215"],["/syntax_and_semantics/compile_time_flags.html","0c55b9c80a2b82b6d570bd26245d9393"],["/syntax_and_semantics/constants.html","7ea78bdb85350832cf061aff6a644cba"],["/syntax_and_semantics/control_expressions.html","4c9560159a6dc429e0b9b5dc835d43a0"],["/syntax_and_semantics/cross-compilation.html","21b49af153814360499fd30277f00217"],["/syntax_and_semantics/declare_var.html","76765bb916f93d34ab229d7e53f5fb04"],["/syntax_and_semantics/default_and_named_arguments.html","5316bc84cda18140304657dbfb54835d"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","922a3097c088e6f438ddd88d463e9aeb"],["/syntax_and_semantics/enum.html","5a8ef6abb67fedd8b3c165a1b2089f57"],["/syntax_and_semantics/everything_is_an_object.html","2e5c985227086bf2e7dafad201f2c7b2"],["/syntax_and_semantics/exception_handling.html","dbc0074892969301247a51bf389389fd"],["/syntax_and_semantics/finalize.html","8ea6c5fbd3b4da82bfcc256ff5fae5f1"],["/syntax_and_semantics/generics.html","93bba2b021ec28775ebae5aff78a5d9c"],["/syntax_and_semantics/if.html","ad71ffab54c37ebff2d7dab9ef08d23f"],["/syntax_and_semantics/if_var.html","1626ac51395f3c4e3ebe8d8bccc8bd89"],["/syntax_and_semantics/if_var_nil.html","8c01dd00b57dd22dc46b7e7a5204e693"],["/syntax_and_semantics/if_varis_a.html","d9238c832434150c477814b44005a7a6"],["/syntax_and_semantics/if_varresponds_to.html","4babbf6b7555e9cadd1e3256e0886f26"],["/syntax_and_semantics/index.html","36386ab8b69603c200b1daa87363b3df"],["/syntax_and_semantics/inheritance.html","b4e7c9f1002fbb64b9b7606312cb083e"],["/syntax_and_semantics/instance_sizeof.html","22686b20b39782076ffe72d83d9dc4bd"],["/syntax_and_semantics/is_a.html","b8d612cfd0343304f5284083e2e0013c"],["/syntax_and_semantics/literals.html","0bab99d67d4ce4868298a6c924e21604"],["/syntax_and_semantics/literals/array.html","0fd023e14d156ccea0d731f2d0905fbf"],["/syntax_and_semantics/literals/bool.html","a9c74c94692ea363f2f56a8f18f50097"],["/syntax_and_semantics/literals/char.html","ceee3185afe129e1e34d882767ee561e"],["/syntax_and_semantics/literals/floats.html","bf300219516b59efad1467251292a934"],["/syntax_and_semantics/literals/hash.html","74566dae32c1c6ce40e299b9a9a0fc28"],["/syntax_and_semantics/literals/integers.html","aede1e0c21e4cc8b6c6529362ede8c3c"],["/syntax_and_semantics/literals/named_tuple.html","b4e72c4e60ad67e2c553f505dc9f0799"],["/syntax_and_semantics/literals/nil.html","8f7f073ea462ac52a305ada42f73e5db"],["/syntax_and_semantics/literals/proc.html","75738b831a7f34cb169c80c55a99c4d0"],["/syntax_and_semantics/literals/range.html","f10505935e2fff19f3e582df07609c16"],["/syntax_and_semantics/literals/regex.html","e0cc38693c21517ed4acdbd5eafb4747"],["/syntax_and_semantics/literals/string.html","44988496d791fc785414555d1c62a124"],["/syntax_and_semantics/literals/symbol.html","4f478242376308ee51a7b88b79ac058f"],["/syntax_and_semantics/literals/tuple.html","e054bcb1a199f5f4ca59414aaf9c2603"],["/syntax_and_semantics/local_variables.html","d731622cb1bae589af7a98efa08b62bf"],["/syntax_and_semantics/low_level_primitives.html","bb836aa229fd674fb08ea750b3823ef1"],["/syntax_and_semantics/macros.html","aab7f650d4d5f38da26fc4c66f44e34d"],["/syntax_and_semantics/macros/fresh_variables.html","bfabcc77ea982aa1d8049494e9f2ac6b"],["/syntax_and_semantics/macros/hooks.html","d47ba82761352fe755ca3e4f7ee6525a"],["/syntax_and_semantics/macros/macro_methods.html","1a3c760a10d49f5865a81c0f649c3da1"],["/syntax_and_semantics/methods_and_instance_variables.html","37c6c7820e702c18cc0b47665a7488a2"],["/syntax_and_semantics/modules.html","d01d4350747209cd0c71f823e1d03b19"],["/syntax_and_semantics/new_initialize_and_allocate.html","30b4de1af866ce4e29f63ca7a438a050"],["/syntax_and_semantics/next.html","af49abc3d57d013a459e42b81855b9cd"],["/syntax_and_semantics/nil_question.html","f33216c2f8396ed7b595e37aaefe1569"],["/syntax_and_semantics/not.html","98e556e01262f3eafb1abcfaeda46627"],["/syntax_and_semantics/offsetof.html","cd1ee41631d14f2f85859973d7fd4166"],["/syntax_and_semantics/operators.html","8ec2cf980c4b76b095648134502ed1d2"],["/syntax_and_semantics/or.html","2900b16c4b524c1f3e767fc9882493a5"],["/syntax_and_semantics/overloading.html","75e96a61993bd985337d2607be43d2a6"],["/syntax_and_semantics/pointerof.html","65f628f117678959aa832daac6bea139"],["/syntax_and_semantics/proc_literal.html","e326904eda41f1fa1427e1e008ba213b"],["/syntax_and_semantics/requiring_files.html","de7c47ef9b659ed85ab8a0c148b304ab"],["/syntax_and_semantics/responds_to.html","96b1f78acf700999e0f0cf2ff1ff5506"],["/syntax_and_semantics/return_types.html","2b5f0612f92a9ad72446e1720fe6916f"],["/syntax_and_semantics/sizeof.html","67366177cb45c1b35ef3826a78a32823"],["/syntax_and_semantics/splats_and_tuples.html","c484763061abca735b5f3b45e5bd416c"],["/syntax_and_semantics/structs.html","908c8a18a9f4b4c82a701c8aac43ece4"],["/syntax_and_semantics/ternary_if.html","28973c9269e47770892c680ddf44e919"],["/syntax_and_semantics/the_program.html","d371ac96c9da14985cfb1b27d36ea4be"],["/syntax_and_semantics/truthy_and_falsey_values.html","b1c9e15477d56e8cecad3d5386cb5022"],["/syntax_and_semantics/type_grammar.html","d84c886a9a8373b9bb2cd7147eff8f4d"],["/syntax_and_semantics/type_inference.html","a7683410f8bf031d3249246eadae6537"],["/syntax_and_semantics/type_reflection.html","abb04b74eb1d5f22f23fb57626cacf75"],["/syntax_and_semantics/type_restrictions.html","a320b8045d12c06d43fd0f9635f641e7"],["/syntax_and_semantics/typeof.html","530a332eac331b519b249329f5d89fd4"],["/syntax_and_semantics/types_and_methods.html","b5d09aaa99718d37e5a1daf3a14e7d91"],["/syntax_and_semantics/union_types.html","d92ddf1ccfb180faac5f94a01bf15edd"],["/syntax_and_semantics/unless.html","022d7257f4e43a5359f9e75e99f75526"],["/syntax_and_semantics/unsafe.html","990e3affb74599a9b5614f38bec142b0"],["/syntax_and_semantics/until.html","1d74cfceef501956e524b777dec8de8a"],["/syntax_and_semantics/virtual_and_abstract_types.html","f92d51909590395386f25d22e0b3d3db"],["/syntax_and_semantics/visibility.html","94686f2c4a02f130b7e5eb5eb8922ca5"],["/syntax_and_semantics/while.html","763f7f1e798b9053820db8c230bc1505"],["/the_shards_command/index.html","842cbb3a27e4a325ff61e65d6972b9ce"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","58f61af02fd513fca4fbe117eeed2233"]];
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







