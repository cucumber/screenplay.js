# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [5.3.0] - 2023-11-15
### Added
- Add support for `@cucumber/cucumber` version `^9.0.0` and `^10.0.0`.

## [5.2.0] - 2022-10-10
### Added
- Add support for ES Modules in the System Under Test [#121](https://github.com/cucumber/screenplay.js/pull/121)

### Fixed
- Dependency on `@cucumber/electron` has been removed, and the example code has moved to https://github.com/cucumber/screenplay.js.examples ([#127](https://github.com/cucumber/screenplay.js/issues/127), [#129](https://github.com/cucumber/screenplay.js/pull/129))
- Allow using `@cucumber/cucumber` version `^8.0.0`.

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

[Unreleased]: https://github.com/cucumber/screenplay.js/compare/v5.3.0...HEAD
[5.3.0]: https://github.com/cucumber/screenplay.js/compare/v5.2.0...v5.3.0
[5.2.0]: https://github.com/cucumber/screenplay.js/compare/v5.1.0...v5.2.0
[5.1.0]: https://github.com/cucumber/screenplay.js/compare/v5.0.0...v5.1.0
[5.0.0]: https://github.com/cucumber/screenplay.js/compare/v4.0.0...v5.0.0
[4.0.0]: https://github.com/cucumber/screenplay.js/compare/v3.1.0...v4.0.0
[3.1.0]: https://github.com/cucumber/screenplay.js/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/cucumber/screenplay.js/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/cucumber/screenplay.js/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/cucumber/screenplay.js/compare/v0.0.1...v1.0.0
[0.0.1]: https://github.com/cucumber/screenplay.js/releases/tag/v0.0.1
