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

var precacheConfig = [["/conventions/coding_style.html","82ce89ee26aa86f7f61ac9f9f1532864"],["/conventions/documenting_code.html","7cfe6f7fecdf332fcaf0471be8fae1ec"],["/conventions/index.html","2506109261f04f5ca6619a2db9446ae3"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection_pool.html","842bbe82a5406fa4fe9ced61b0ccab3d"],["/database/index.html","833778061e9c9ee7218265fc1e45e5ec"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-ga/plugin.js","8b0d0bfffa07cfd2675fffb1b7b6e6f4"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/concurrency.html","89b73884eafb0dad9a117ae573b737c0"],["/guides/index.html","d8f937259f542aee42cb561f683ce754"],["/guides/performance.html","981dfd3c599305b456492c2a6d934f54"],["/guides/testing.html","b7fff0f1e5973c14b43e8792f99c6976"],["/guides/writing_shards.html","470ca006477a7ed495329b7903a1a818"],["/index.html","4817ef22c167d737626a020be37b849c"],["/installation/from_a_targz.html","daa821c5e1440cc52a32058c3bf5d15e"],["/installation/from_source_repository.html","29547aa0c875bdabea2d24f2d892e9c2"],["/installation/index.html","b544b5a9326fa2b7faf5af91dd63da3f"],["/installation/on_alpine_linux.html","d88e7e873478eb03b2610c285e5e175a"],["/installation/on_arch_linux.html","76110cc8fe7b7dd22f5e0c16a481e01f"],["/installation/on_bash_on_ubuntu_on_windows.html","d95ca0ef7825e033c627d7d7779bda45"],["/installation/on_debian_and_ubuntu.html","e7ddd61b03c8e6540d49180acfce43ce"],["/installation/on_freebsd.html","98c5b09edc0529617beb42a5c7205017"],["/installation/on_gentoo_linux.html","f07e92c7d247cbec638769bdf0248495"],["/installation/on_linux_using_linuxbrew.html","51bc4c7ab90aa2077f2ecf967201344b"],["/installation/on_mac_osx_using_homebrew.html","715adb9ad5d06baf3a678fc4298fa0e3"],["/installation/on_redhat_and_centos.html","9fafb362b751a3bbca02396bb02c4c67"],["/overview/hello_world.html","490d0f9c650d3e880c9c4a2b7e2ed766"],["/overview/http_server.html","72be2ac7ca3376c74a2fa33d7a8a4424"],["/overview/index.html","755e9187f66af557cceda9b7d73ea845"],["/syntax_and_semantics/alias.html","18eeecb00194e72415e6c2c756dee00a"],["/syntax_and_semantics/and.html","883c2de92c2ef2293f4d85685f4e1736"],["/syntax_and_semantics/as.html","d84775ec22376f2bc26f4b0cebf71b07"],["/syntax_and_semantics/as_a_suffix.html","4a261b3342f54485a272fd2cd88fc154"],["/syntax_and_semantics/as_an_expression.html","4a241ebc74c4de6cdde293a8873a9db7"],["/syntax_and_semantics/as_question.html","1f7cb50ef280388169dfabf0233f96cc"],["/syntax_and_semantics/assignment.html","8483c2d9e6c8b4499e7f727842f9ea37"],["/syntax_and_semantics/attributes.html","6de44b16e2c37671cabe354fa11a1571"],["/syntax_and_semantics/block_forwarding.html","c213ace2121023ce2a1cdf5de64c3731"],["/syntax_and_semantics/blocks_and_procs.html","818f7a683ad984e76079937608eae651"],["/syntax_and_semantics/break.html","7dc9e49368f6a98437687c550c32ce66"],["/syntax_and_semantics/c_bindings/alias.html","7b31f83404757e33cfd31b40cc7f3f34"],["/syntax_and_semantics/c_bindings/callbacks.html","d44b1e5504bbed72e904105469230042"],["/syntax_and_semantics/c_bindings/constants.html","b038b9c1976cd75ff6206532a3513868"],["/syntax_and_semantics/c_bindings/enum.html","76dd147ecf49b07cbfaeed5ae6610bc9"],["/syntax_and_semantics/c_bindings/fun.html","9fe0c59a631852bc9853f842e3c22646"],["/syntax_and_semantics/c_bindings/index.html","83b886d9621dcda11de493880e1cd48e"],["/syntax_and_semantics/c_bindings/lib.html","eefb49aafa2ce4ec32120eb4c040183b"],["/syntax_and_semantics/c_bindings/out.html","726cd072e0d9ad60008e3d08fae244f4"],["/syntax_and_semantics/c_bindings/struct.html","f7f0a788767c282425e273e8c7f15c98"],["/syntax_and_semantics/c_bindings/to_unsafe.html","f442b84fe41812c8b5ba5c0b1c940f2f"],["/syntax_and_semantics/c_bindings/type.html","3ce5d4c7c83168647ae3e0c1df20ed44"],["/syntax_and_semantics/c_bindings/union.html","9dce7e0cb36faaf8458acb757b92d0a8"],["/syntax_and_semantics/c_bindings/variables.html","f69052bb7071a73ceade60e6dbe49c2b"],["/syntax_and_semantics/capturing_blocks.html","ed57926f6796ac206257b0af71b1db74"],["/syntax_and_semantics/case.html","5cc8291dd154e5acb2c1a29a2c6e2e8c"],["/syntax_and_semantics/class_methods.html","8e9a424359bc304c2e44ce9b04377154"],["/syntax_and_semantics/class_variables.html","a5c6a7e8cb75f1a400c44588efd8c1c7"],["/syntax_and_semantics/classes_and_methods.html","1ed98a079d759c6b5161e8c5f0917029"],["/syntax_and_semantics/closures.html","eefd51bb879724861d1898ebbfa3408f"],["/syntax_and_semantics/comments.html","ef390c8bb34c1e18e48af8e9b3236fa1"],["/syntax_and_semantics/compile_time_flags.html","babc80db9054875bce573671668154e9"],["/syntax_and_semantics/constants.html","7efa06463e88213f12216ec2da5b82d7"],["/syntax_and_semantics/control_expressions.html","7db7f09448ded5bf8382aa7062bdb085"],["/syntax_and_semantics/cross-compilation.html","0c6c3f722ad462135655bd8564586868"],["/syntax_and_semantics/declare_var.html","a785b68a727509282f44cf5960a3e231"],["/syntax_and_semantics/default_and_named_arguments.html","53cd5947f2607d6649aca03a57bcca09"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","65d90857b379627340719e1b2f97f756"],["/syntax_and_semantics/enum.html","7374a2a4822dcb394a0d874acc191e1e"],["/syntax_and_semantics/everything_is_an_object.html","f95fe0dd02d1e1596f2c591ef74b5d3a"],["/syntax_and_semantics/exception_handling.html","b923e5c178f7858f48aecbd94e6660d4"],["/syntax_and_semantics/finalize.html","39ad4d5d48ed3460500d967993395a98"],["/syntax_and_semantics/generics.html","019784a65355a7050d41fa0b646d538f"],["/syntax_and_semantics/if.html","16aaed91ab5f4a75f500a6d45acb71e3"],["/syntax_and_semantics/if_var.html","bf2ca0400f6f25052813b500311ccef2"],["/syntax_and_semantics/if_var_nil.html","16c5bc4be3efcee6140449e3af172f73"],["/syntax_and_semantics/if_varis_a.html","b30578e24a88603c40359879b4702a7e"],["/syntax_and_semantics/if_varresponds_to.html","7c95621e89b3487af53082e07e21794f"],["/syntax_and_semantics/index.html","b2a64683c92c1ab02b8fb962a3e88bfa"],["/syntax_and_semantics/inheritance.html","6f9e7c4c47bcfe2cac9d79d1f8c5290f"],["/syntax_and_semantics/instance_sizeof.html","f99aebae0eaf82a0cc286ebdd5286048"],["/syntax_and_semantics/is_a.html","b4d7675c8b3f65c1d6aad033df9ea2eb"],["/syntax_and_semantics/literals.html","1f0d47ac0717213fb699cf2cb319b042"],["/syntax_and_semantics/literals/array.html","7b2fc9f369b0dd37d058387ed9ea19fb"],["/syntax_and_semantics/literals/bool.html","00a517ef0070ece735fa48209f2cb9e1"],["/syntax_and_semantics/literals/char.html","81ad20039dceab1e129f0b5944b18b87"],["/syntax_and_semantics/literals/floats.html","8dde71aed3f8b19fc4361b286af576fe"],["/syntax_and_semantics/literals/hash.html","9c65851101e6c80c2b92d6e958034f58"],["/syntax_and_semantics/literals/integers.html","c4a0964577222749c3927428e2d5f9b5"],["/syntax_and_semantics/literals/named_tuple.html","e7933a8ab1b515dde2a3b69f78db9f92"],["/syntax_and_semantics/literals/nil.html","c0a9b7aa58c296de0c6c229c8d3b97db"],["/syntax_and_semantics/literals/proc.html","9a639bf3d09b88f5b7ea2299b79c8155"],["/syntax_and_semantics/literals/range.html","77de896f66fe325a92424c4e99077cc9"],["/syntax_and_semantics/literals/regex.html","986694551ecf0707bd54f295f4c9f1ea"],["/syntax_and_semantics/literals/string.html","5dbbff03127e6157f1c20f85464b065e"],["/syntax_and_semantics/literals/symbol.html","6530f6e6eb4fdc9aa7d52cdf68d6ed52"],["/syntax_and_semantics/literals/tuple.html","a185cb5e443b0ae7135764dbb0f33377"],["/syntax_and_semantics/local_variables.html","7c677cddf43f43ec2067c419368506e4"],["/syntax_and_semantics/low_level_primitives.html","7142614c5cdeaaaccb1cd9dee9ead91d"],["/syntax_and_semantics/macros.html","220d1c9a307e2de294d862bb7ab1a9fa"],["/syntax_and_semantics/macros/fresh_variables.html","10af2637e8e21d8619c45049704fc52a"],["/syntax_and_semantics/macros/hooks.html","7d89707e338a29513b5d29546ee72263"],["/syntax_and_semantics/macros/macro_methods.html","6111474deda9f62f92fa2119e018d57a"],["/syntax_and_semantics/methods_and_instance_variables.html","a01a95182f70a5b296184e4f84208b9a"],["/syntax_and_semantics/modules.html","26991dff4df4be70511d913e4dc0b872"],["/syntax_and_semantics/multiple_assignment.html","9420447737859fde6149ead1a9c4c486"],["/syntax_and_semantics/new_initialize_and_allocate.html","0f0d5de3161824519573ecb334000b72"],["/syntax_and_semantics/next.html","4b2cef02657a3368148e0d8e5cc37aae"],["/syntax_and_semantics/nil_question.html","fa5de2bba32c0898a69164a7214caa9e"],["/syntax_and_semantics/not.html","b64601bd608be95836f06d9f8b512fc5"],["/syntax_and_semantics/operators.html","4a74d1633022f36e7ae136b92a79f091"],["/syntax_and_semantics/or.html","7ddd445f8045b6a651c1a9127124a74d"],["/syntax_and_semantics/overloading.html","0c1d3c787cad20c3f8f0917f142f51ce"],["/syntax_and_semantics/pointerof.html","78d9bba6b7ccf077be5f310dfb1275f8"],["/syntax_and_semantics/proc_literal.html","0fe2477d8d34a826743d9a0158747909"],["/syntax_and_semantics/requiring_files.html","d45131ef1669fbcee8c3b2badbb3ab31"],["/syntax_and_semantics/responds_to.html","23be36c5e6731db83d4cc4c864be5de6"],["/syntax_and_semantics/return_types.html","d4eb3282b649c5695bd126e33822d75a"],["/syntax_and_semantics/sizeof.html","d747ddc8520cccd7de7d44339c09fe25"],["/syntax_and_semantics/splats_and_tuples.html","64f6933b778bc6ad4dec89288b6de8d0"],["/syntax_and_semantics/structs.html","720f3de6d7409cf625f5dce8d13db2ac"],["/syntax_and_semantics/ternary_if.html","c2be88c90cd296a2281c6cc5ddfe80ac"],["/syntax_and_semantics/the_program.html","790d91851f607c407a84c487b4723acc"],["/syntax_and_semantics/truthy_and_falsey_values.html","2153942bfaf01605c7c447f6a1e2aae1"],["/syntax_and_semantics/type_grammar.html","5a5d26dc62fefcc076de1ec7eb6caf3c"],["/syntax_and_semantics/type_inference.html","91ff33d843b5737142b8bd75cdc2be47"],["/syntax_and_semantics/type_reflection.html","93a0f90e037c15f937b2e83616381165"],["/syntax_and_semantics/type_restrictions.html","fe06011c339391f7a11a275d10ad2ac5"],["/syntax_and_semantics/typeof.html","c5f467411157397af5ad881bf78269b0"],["/syntax_and_semantics/types_and_methods.html","877753d3cc2ad6793aee4446dafa69b8"],["/syntax_and_semantics/union_types.html","e28546187e36fa9bec6fed2a3861515e"],["/syntax_and_semantics/unless.html","2911bba946231628eb47dabb8ed6e59b"],["/syntax_and_semantics/unsafe.html","c0c9588448cbee2d6670e97fc4927629"],["/syntax_and_semantics/until.html","b49feaf109b728799f80e2a00d2ca7e1"],["/syntax_and_semantics/virtual_and_abstract_types.html","60593a8e00ee17de3712ad887f5a14e1"],["/syntax_and_semantics/visibility.html","175302d84bb8e7bd546a801ec6a47e83"],["/syntax_and_semantics/while.html","dd93ed38f9c451587b92e696b9425451"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","2bedd5a757cf65a57558d30a5be6f737"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
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

var createCacheKey = function (originalUrl, paramName, paramValue,
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

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
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

var stripIgnoredUrlParameters = function (originalUrl,
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







