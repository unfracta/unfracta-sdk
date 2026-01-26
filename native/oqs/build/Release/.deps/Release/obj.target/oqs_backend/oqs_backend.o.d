cmd_Release/obj.target/oqs_backend/oqs_backend.o := c++ -o Release/obj.target/oqs_backend/oqs_backend.o ../oqs_backend.cc '-DNODE_GYP_MODULE_NAME=oqs_backend' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-D_GLIBCXX_USE_CXX11_ABI=1' '-D_FILE_OFFSET_BITS=64' '-D_DARWIN_USE_64_BIT_INODE=1' '-D_LARGEFILE_SOURCE' '-DOPENSSL_NO_PINSHARED' '-DOPENSSL_THREADS' '-DNAPI_CPP_EXCEPTIONS' '-DBUILDING_NODE_EXTENSION' -I/Users/cforsyth/Library/Caches/node-gyp/24.13.0/include/node -I/Users/cforsyth/Library/Caches/node-gyp/24.13.0/src -I/Users/cforsyth/Library/Caches/node-gyp/24.13.0/deps/openssl/config -I/Users/cforsyth/Library/Caches/node-gyp/24.13.0/deps/openssl/openssl/include -I/Users/cforsyth/Library/Caches/node-gyp/24.13.0/deps/uv/include -I/Users/cforsyth/Library/Caches/node-gyp/24.13.0/deps/zlib -I/Users/cforsyth/Library/Caches/node-gyp/24.13.0/deps/v8/include -I/Users/cforsyth/unfracta-sdk/node_modules/.pnpm/node-addon-api@8.5.0/node_modules/node-addon-api -I/opt/homebrew/include  -O3 -gdwarf-2 -fno-strict-aliasing -mmacosx-version-min=13.5 -arch arm64 -Wall -Wendif-labels -W -Wno-unused-parameter -std=c++17 -stdlib=libc++ -fno-rtti -MMD -MF ./Release/.deps/Release/obj.target/oqs_backend/oqs_backend.o.d.raw   -c
Release/obj.target/oqs_backend/oqs_backend.o: ../oqs_backend.cc \
  /Users/cforsyth/unfracta-sdk/node_modules/.pnpm/node-addon-api@8.5.0/node_modules/node-addon-api/napi.h \
  /Users/cforsyth/Library/Caches/node-gyp/24.13.0/include/node/node_api.h \
  /Users/cforsyth/Library/Caches/node-gyp/24.13.0/include/node/js_native_api.h \
  /Users/cforsyth/Library/Caches/node-gyp/24.13.0/include/node/js_native_api_types.h \
  /Users/cforsyth/Library/Caches/node-gyp/24.13.0/include/node/node_api_types.h \
  /Users/cforsyth/unfracta-sdk/node_modules/.pnpm/node-addon-api@8.5.0/node_modules/node-addon-api/napi-inl.h \
  /Users/cforsyth/unfracta-sdk/node_modules/.pnpm/node-addon-api@8.5.0/node_modules/node-addon-api/napi-inl.deprecated.h \
  /opt/homebrew/include/oqs/oqs.h /opt/homebrew/include/oqs/oqsconfig.h \
  /opt/homebrew/include/oqs/common.h /opt/homebrew/include/oqs/rand.h \
  /opt/homebrew/include/oqs/kem.h /opt/homebrew/include/oqs/kem_bike.h \
  /opt/homebrew/include/oqs/kem_classic_mceliece.h \
  /opt/homebrew/include/oqs/kem_kyber.h \
  /opt/homebrew/include/oqs/kem_ml_kem.h \
  /opt/homebrew/include/oqs/kem_ntru.h \
  /opt/homebrew/include/oqs/kem_ntruprime.h \
  /opt/homebrew/include/oqs/kem_frodokem.h \
  /opt/homebrew/include/oqs/sig.h /opt/homebrew/include/oqs/sig_ml_dsa.h \
  /opt/homebrew/include/oqs/sig_falcon.h \
  /opt/homebrew/include/oqs/sig_sphincs.h \
  /opt/homebrew/include/oqs/sig_mayo.h \
  /opt/homebrew/include/oqs/sig_cross.h \
  /opt/homebrew/include/oqs/sig_uov.h \
  /opt/homebrew/include/oqs/sig_snova.h \
  /opt/homebrew/include/oqs/sig_slh_dsa.h \
  /opt/homebrew/include/oqs/sig_stfl.h \
  /opt/homebrew/include/oqs/aes_ops.h \
  /opt/homebrew/include/oqs/sha2_ops.h \
  /opt/homebrew/include/oqs/sha3_ops.h \
  /opt/homebrew/include/oqs/sha3x4_ops.h
../oqs_backend.cc:
/Users/cforsyth/unfracta-sdk/node_modules/.pnpm/node-addon-api@8.5.0/node_modules/node-addon-api/napi.h:
/Users/cforsyth/Library/Caches/node-gyp/24.13.0/include/node/node_api.h:
/Users/cforsyth/Library/Caches/node-gyp/24.13.0/include/node/js_native_api.h:
/Users/cforsyth/Library/Caches/node-gyp/24.13.0/include/node/js_native_api_types.h:
/Users/cforsyth/Library/Caches/node-gyp/24.13.0/include/node/node_api_types.h:
/Users/cforsyth/unfracta-sdk/node_modules/.pnpm/node-addon-api@8.5.0/node_modules/node-addon-api/napi-inl.h:
/Users/cforsyth/unfracta-sdk/node_modules/.pnpm/node-addon-api@8.5.0/node_modules/node-addon-api/napi-inl.deprecated.h:
/opt/homebrew/include/oqs/oqs.h:
/opt/homebrew/include/oqs/oqsconfig.h:
/opt/homebrew/include/oqs/common.h:
/opt/homebrew/include/oqs/rand.h:
/opt/homebrew/include/oqs/kem.h:
/opt/homebrew/include/oqs/kem_bike.h:
/opt/homebrew/include/oqs/kem_classic_mceliece.h:
/opt/homebrew/include/oqs/kem_kyber.h:
/opt/homebrew/include/oqs/kem_ml_kem.h:
/opt/homebrew/include/oqs/kem_ntru.h:
/opt/homebrew/include/oqs/kem_ntruprime.h:
/opt/homebrew/include/oqs/kem_frodokem.h:
/opt/homebrew/include/oqs/sig.h:
/opt/homebrew/include/oqs/sig_ml_dsa.h:
/opt/homebrew/include/oqs/sig_falcon.h:
/opt/homebrew/include/oqs/sig_sphincs.h:
/opt/homebrew/include/oqs/sig_mayo.h:
/opt/homebrew/include/oqs/sig_cross.h:
/opt/homebrew/include/oqs/sig_uov.h:
/opt/homebrew/include/oqs/sig_snova.h:
/opt/homebrew/include/oqs/sig_slh_dsa.h:
/opt/homebrew/include/oqs/sig_stfl.h:
/opt/homebrew/include/oqs/aes_ops.h:
/opt/homebrew/include/oqs/sha2_ops.h:
/opt/homebrew/include/oqs/sha3_ops.h:
/opt/homebrew/include/oqs/sha3x4_ops.h:
