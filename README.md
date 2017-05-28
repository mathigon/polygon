# PolygON

A mobile app for mathematics museums and science centers. Visitors can discover regular polygons hidden around the exhibition, and use them to generate regular polyhedra.


## Development

To install react native, follow the instructions in https://facebook.github.io/react-native/docs/getting-started.html.

Install all dependencies of this app using `npm install`.

Run the App in iOS simulator using `react-native run-ios`.


## TODO list

[P1] Badges (disabled, modal content, alerts)
[P1] Powerups locked style + fn
[P1] Check all styles, CSS cleanup

[P2] About screen + subscreens
[P2] Polyhedron screens (Images, SVG download)
[P2] Generate many QR codes

[P3] Tutorial, help messages across app
[P3] Swap shapes screen

[P4] Android support, Web version?
[P4] Code signing and App Store release
[P4] Interactive rotations, folding animation
[P4] Nicer and customisable QR codes


## 3d Model Generation

* Generate model in Cheeta3D and export to Video
* Convert to PNG frames in Adobe Media encoder
* Generate @3x assets using https://github.com/lukszar/iOS-Images-Prepare
* Compress using Pngyu and ImageOptim.


## Ideas

https://itunes.apple.com/us/app/unfold/id557099803
https://github.com/ProjectSeptemberInc/gl-react-native
https://github.com/williamngan/react-native-sprite

https://facebook.github.io/react-native/docs/gesture-responder-system.html
