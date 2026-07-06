/* Contact page script — placeholder form handling.
   The form is provider-agnostic (data-form-slot); when a Formspree ID
   arrives, set the form action and remove the placeholder branch. */
(function () {
  'use strict';

  var form = document.querySelector('[data-form-slot]');
  if (!form) return;

  var status = form.querySelector('[data-form-status]');
  var wired = form.getAttribute('action') && form.getAttribute('action') !== '#';

  form.addEventListener('submit', function (e) {
    if (wired) return; // provider handles it
    e.preventDefault();
    if (status) {
      status.textContent =
        'The form isn’t connected yet — please call us instead.';
      status.classList.add('is-error');
    }
  });
})();
