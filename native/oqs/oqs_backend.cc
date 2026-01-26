#include <napi.h>
#include <oqs/oqs.h>

#include <vector>
#include <string>

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

static OQS_SIG* newMLDSA44() {
  return OQS_SIG_new("ML-DSA-44");
}

// -----------------------------------------------------------------------------
// info() -> string (liboqs version)
// -----------------------------------------------------------------------------

static Napi::Value info(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  return Napi::String::New(env, OQS_VERSION_TEXT);
}

// -----------------------------------------------------------------------------
// keypairMLDSA44() -> { publicKey: Buffer, secretKey: Buffer }
// -----------------------------------------------------------------------------

static Napi::Value keypairMLDSA44(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  OQS_SIG* sig = newMLDSA44();
  if (!sig) {
    Napi::Error::New(
      env,
      "Failed to init ML-DSA-44 (OQS_SIG_new returned null)"
    ).ThrowAsJavaScriptException();
    return env.Null();
  }

  std::vector<uint8_t> pk(sig->length_public_key);
  std::vector<uint8_t> sk(sig->length_secret_key);

  if (OQS_SIG_keypair(sig, pk.data(), sk.data()) != OQS_SUCCESS) {
    OQS_SIG_free(sig);
    Napi::Error::New(
      env,
      "ML-DSA-44 keypair generation failed"
    ).ThrowAsJavaScriptException();
    return env.Null();
  }

  OQS_SIG_free(sig);

  Napi::Object out = Napi::Object::New(env);
  out.Set(
    "publicKey",
    Napi::Buffer<uint8_t>::Copy(env, pk.data(), pk.size())
  );
  out.Set(
    "secretKey",
    Napi::Buffer<uint8_t>::Copy(env, sk.data(), sk.size())
  );

  return out;
}

// -----------------------------------------------------------------------------
// signMLDSA44(payload: Buffer, secretKey: Buffer) -> Buffer (signature)
// -----------------------------------------------------------------------------

static Napi::Value signMLDSA44(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() != 2 ||
      !info[0].IsBuffer() ||
      !info[1].IsBuffer()) {
    Napi::TypeError::New(
      env,
      "Expected (Buffer payload, Buffer secretKey)"
    ).ThrowAsJavaScriptException();
    return env.Null();
  }

  auto payload = info[0].As<Napi::Buffer<uint8_t>>();
  auto secretKey = info[1].As<Napi::Buffer<uint8_t>>();

  OQS_SIG* sig = newMLDSA44();
  if (!sig) {
    Napi::Error::New(
      env,
      "Failed to init ML-DSA-44"
    ).ThrowAsJavaScriptException();
    return env.Null();
  }

  if (secretKey.Length() != sig->length_secret_key) {
    OQS_SIG_free(sig);
    Napi::Error::New(
      env,
      "Secret key length mismatch for ML-DSA-44"
    ).ThrowAsJavaScriptException();
    return env.Null();
  }

  std::vector<uint8_t> signature(sig->length_signature);
  size_t signature_len = 0;

  if (OQS_SIG_sign(
        sig,
        signature.data(),
        &signature_len,
        payload.Data(),
        payload.Length(),
        secretKey.Data()
      ) != OQS_SUCCESS) {
    OQS_SIG_free(sig);
    Napi::Error::New(
      env,
      "ML-DSA-44 signing failed"
    ).ThrowAsJavaScriptException();
    return env.Null();
  }

  OQS_SIG_free(sig);

  return Napi::Buffer<uint8_t>::Copy(
    env,
    signature.data(),
    signature_len
  );
}

// -----------------------------------------------------------------------------
// verifyMLDSA44(
//   payload: Buffer,
//   signature: Buffer,
//   publicKey: Buffer
// ) -> boolean
// -----------------------------------------------------------------------------

static Napi::Value verifyMLDSA44(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() != 3 ||
      !info[0].IsBuffer() ||
      !info[1].IsBuffer() ||
      !info[2].IsBuffer()) {
    Napi::TypeError::New(
      env,
      "Expected (Buffer payload, Buffer signature, Buffer publicKey)"
    ).ThrowAsJavaScriptException();
    return env.Null();
  }

  auto payload   = info[0].As<Napi::Buffer<uint8_t>>();
  auto signature = info[1].As<Napi::Buffer<uint8_t>>();
  auto publicKey = info[2].As<Napi::Buffer<uint8_t>>();

  OQS_SIG* sig = newMLDSA44();
  if (!sig) {
    Napi::Error::New(
      env,
      "Failed to init ML-DSA-44"
    ).ThrowAsJavaScriptException();
    return env.Null();
  }

  if (publicKey.Length() != sig->length_public_key) {
    OQS_SIG_free(sig);
    Napi::Error::New(
      env,
      "Public key length mismatch for ML-DSA-44"
    ).ThrowAsJavaScriptException();
    return env.Null();
  }

  if (signature.Length() > sig->length_signature) {
    OQS_SIG_free(sig);
    Napi::Error::New(
      env,
      "Signature length invalid for ML-DSA-44"
    ).ThrowAsJavaScriptException();
    return env.Null();
  }

  OQS_STATUS rc = OQS_SIG_verify(
    sig,
    payload.Data(),
    payload.Length(),
    signature.Data(),
    signature.Length(),
    publicKey.Data()
  );

  OQS_SIG_free(sig);

  return Napi::Boolean::New(env, rc == OQS_SUCCESS);
}

// -----------------------------------------------------------------------------
// Module init
// -----------------------------------------------------------------------------

static Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set("info", Napi::Function::New(env, info));
  exports.Set("keypairMLDSA44", Napi::Function::New(env, keypairMLDSA44));
  exports.Set("signMLDSA44", Napi::Function::New(env, signMLDSA44));
  exports.Set("verifyMLDSA44", Napi::Function::New(env, verifyMLDSA44));
  return exports;
}

NODE_API_MODULE(oqs_backend, Init)
