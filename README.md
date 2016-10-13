# fl-form-builder-custom-dropdown

![badge](http://forthebadge.com/images/badges/reading-6th-grade-level.svg)

Uh, what a name. Basically, this allows you to build custom dropdowns for [`fl-form-builder`](https://github.com/fourlabsldn/fl-form-builder) that are compatible with [`fl-interactive-form`](https://github.com/fourlabsldn/fl-interactive-form).


# How to use it?

Lo and behold:

``` javascript
import customDropdown from 'fl-form-builder-custom-dropdown';
import moment from 'moment';

const typeInfo = {
  // All keys are Compulsory
  type: 'ThreeMonthsSelector',
  displayName: 'Next Three Months Selector',
  group: 'Custom Components',
  required: false,
  title: 'Choose a month',
  options: [
    moment().add(0, 'month').format('MMMM'),
    moment().add(1, 'month').format('MMMM'),
    moment().add(2, 'month').format('MMMM'),
  ],
};


const ThreeMonthsSelector = customDropdown(typeInfo);
export default ThreeMonthsSelector;

```

That's it. Now just witness the magic happening when you include it in `fl-form-builder` or `fl-interactive-form`.
