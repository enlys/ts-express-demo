export default function assetHelper(req, opt = {
  publicPath: "",
  prepend: ""
}) {
  return function assetPath(assetName) {
    let url;
    if (req.app.get('env') === "development") {
      url = assetName;
    }
    if (req.app.get('env') === "production") {
      const manifest = req.app.get('assetsManifest');
      url = manifest[assetName];
    }
    return url;
  };
}