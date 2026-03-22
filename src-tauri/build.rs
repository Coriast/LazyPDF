fn main() {
  #[cfg(target_os = "linux")]
  unsafe {
      std::env::set_var("WEBKIT_DISABLE_DMABUF_RENDERER", "1");
      std::env::set_var("WEBKIT_DISABLE_COMPOSITING_MODE", "1");
  }
  tauri_build::build()
}
