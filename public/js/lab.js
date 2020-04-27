$("#form-freq").validate({
  rules: {
    frequency: {
      required: true,
      range: [30, 10000],
    }
  },
  messages: {
    frequency: {
      required: "The field is required",
      range: "Must be between 30Hz and 10000Hz",
    },
  }
});