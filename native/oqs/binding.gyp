{
  "targets": [
    {
      "target_name": "oqs_backend",
      "sources": [
        "oqs_backend.cc"
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include_dir\")",
        "/opt/homebrew/include"
      ],
      "libraries": [
        "-L/opt/homebrew/lib",
        "-loqs"
      ],
      "cflags_cc": [
        "-std=c++17",
        "-fexceptions"
      ],
      "defines": [
        "NAPI_CPP_EXCEPTIONS"
      ],
      "conditions": [
        [
          "OS=='mac'",
          {
            "xcode_settings": {
              "CLANG_CXX_LANGUAGE_STANDARD": "c++17",
              "CLANG_CXX_LIBRARY": "libc++",
              "GCC_ENABLE_CPP_EXCEPTIONS": "YES"
            }
          }
        ]
      ]
    }
  ]
}
