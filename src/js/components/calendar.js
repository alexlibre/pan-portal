import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru';
import 'flatpickr/dist/themes/airbnb.css';

const initDatePickers = () => {

  const date = flatpickr('.js-datepicker', {
    dateFormat: "d M Y",
    minDate: "today",
    enableTime: false,
    locale: Russian,
  });

  var time = flatpickr('.js-timepicker', {
    time_24hr: true,
    noCalendar: true,
    enableTime: true,
  });
}

export default initDatePickers;
