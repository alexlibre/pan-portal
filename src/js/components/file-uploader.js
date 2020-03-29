const initFileUploader = () => {
  const form = document.getElementById("form-upload");
  const file_label = document.getElementById("file-label");
  const file_input = document.getElementById("file-input");

  if(!file_label || !file_input) return false;

  let file;
  let file_name = "";
  let file_ext = "";

  const initEvents = () => {
    file_input.addEventListener("change", handleInputChange);
    // file_label.addEventListener("change", handleLabelChange);
    file_label.addEventListener("click", handleLabelClick);
  };

  const handleLabelClick = event => {
    if (!file) file_input.click();
  };

  const handleInputChange = event => {
    file = event.target.files[0];
    if (!file) return (file_label.value = "");

    let file_match_ext = file.name.match(/(.+)\.[^.]+$/);
    file_name = file_match_ext === null ? file.name : file_match_ext[1];
    file_ext = file_match_ext === null ? "" : file_match_ext[0];

    file_label.value = file_name;
  };

  // const handleLabelChange = event => {
  //   if (!file) return;

  //   let new_file_name = event.target.value + file_ext;
  //   let file_blob = file.slice(0, file.size, file.type);
  //   let new_file = new File([file_blob], new_file_name);
  //   file_input.files[0] = new_file;
  //   console.log("form: ", file_input);
  // };

  if (form) initEvents();
};

export default initFileUploader;
