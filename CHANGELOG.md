# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [5.1.0] - 2021-11-12
### Added
- Added `World` generic type to `Action` and `PromiseAction`

## [5.0.0] - 2021-07-02
### Changed
- Rename the `Interaction` type to `Action`.
- Explain that _tasks_ can be decomposed into multiple _interactions_, and that
they are both of type `Action`.

## [4.0.0] - 2021-07-30
### Changed
- Renamed the library back to `@cucumber/screenplay` [#39](https://github.com/cucumber/screenplay.js/pull/39)

## [3.1.0] - 2021-07-07
### Added
- Expose `eventually` function

## [3.0.0] - 2021-07-07
### Changed
- Renamed the library to `@cucumber/playwright` [#29](https://github.com/cucumber/screenplay.js/pull/29)

## [2.0.0] - 2021-07-06
### Added
- Added automatic loading of interactions if the `interactions` [world parameter](https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/world.md#world-parameters) is defined
- Added `PromiseInteraction` type

### Fixed

### Removed
- Removed the use of environment variables in the example project
- Removed `InteractionLoader` and `makeInteractionLoader` from the public API

## [1.0.0] - 2021-07-02
### Changed
- First stable release

## [0.0.1] - 2021-05-17
### Added
- First release

[Unreleased]: https://github.com/cucumber/screenplay.js/compare/v5.1.0...HEAD
[5.1.0]: https://github.com/cucumber/screenplay.js/compare/v5.0.0...v5.1.0
[5.0.0]: https://github.com/cucumber/screenplay.js/compare/v4.0.0...v5.0.0
[4.0.0]: https://github.com/cucumber/screenplay.js/compare/v3.1.0...v4.0.0
[3.1.0]: https://github.com/cucumber/screenplay.js/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/cucumber/screenplay.js/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/cucumber/screenplay.js/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/cucumber/screenplay.js/compare/v0.0.1...v1.0.0
[0.0.1]: https://github.com/cucumber/screenplay.js/releases/tag/v0.0.1
