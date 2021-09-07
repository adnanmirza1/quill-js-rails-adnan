import { DirectUpload } from "@rails/activestorage"
import ImageResize from "@taoqf/quill-image-resize-module/image-resize.min";
import Quill from 'quill/quill';
export default Quill;

Quill.register('modules/imageResize', ImageResize);

// document.addEventListener("DOMContentLoaded", function (event) {
//     var quill = new Quill('#editor-container', {
//         modules: {
//             toolbar: [
//                 [{ header: [1, 2, false] }],
//                 ['bold', 'italic', 'underline'],
//                 ['image', 'code-block']
//             ]
//         },
//         placeholder: 'Compose an epic...',
//         theme: 'snow'
//     });
//
//     document.querySelector('form').onsubmit = function () {
//         var body = document.querySelector('input[class=article-content]');
//         body.value = quill.root.innerHTML
//     };
// });

document.addEventListener("DOMContentLoaded", function (event) {
    var quill = new Quill('#editor-container', {
        modules: {
            toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ color: [] }],
                [{ size: [] }],
                [
                    'bold', 'italic', 'underline', 'strike',
                    { 'script': 'super'},
                    { 'script': 'sub' },
                    'code', 'link'
                ],
                ['blockquote', 'code-block', 'image'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ align: ['center', 'right', 'justify', false] }],
                [{ indent: '-1'}, { indent: '+1' }]


            ],
            imageResize: {
                displaySize: true,
                displayStyles: {
                    backgroundColor: 'black',
                    border: 'none',
                    color: 'white'
                },
                modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
            }
        },
        value: document.querySelector('input[class=article-content]').value,
        theme: 'snow'
    });

    document.querySelector('form').onsubmit = function () {
        var body = document.querySelector('input[class=article-content]');
        body.value = quill.root.innerHTML
    };

    // More on this in a bit!
    quill.getModule('toolbar').addHandler('image', () => {
        importImage(quill);
    });
});

var importImage = function (textEditor) {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();

    input.onchange = () => {
        const file = input.files[0];

        // Ensure only images are uploaded
        if (/^image\//.test(file.type)) {
            uploadImage(textEditor, file);
        } else {
            alert('Only images allowed');
        }
    };
};

var uploadImage = function (textEditor, file) {
    var fd = new FormData();
    fd.append('blob', file);

    var upload = new DirectUpload(file, '/rails/active_storage/direct_uploads')
    upload.create((error, blob) => {
        if (error) {
            console.log(error)
        } else {
            insertImage(
                textEditor,
                `/rails/active_storage/blobs/${blob.signed_id}/${blob.filename}`
            );
        }
    });
};

var insertImage = function (textEditor, fileUrl) {
    const range = textEditor.getSelection();
    textEditor.insertEmbed(range.index, 'image', fileUrl);
};

var icons = Quill.import('ui/icons');

icons['code'] = `<svg class="bi bi-code" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M5.854 4.146a.5.5 0 010 .708L2.707 8l3.147 3.146a.5.5 0 01-.708.708l-3.5-3.5a.5.5 0 010-.708l3.5-3.5a.5.5 0 01.708 0zm4.292 0a.5.5 0 000 .708L13.293 8l-3.147 3.146a.5.5 0 00.708.708l3.5-3.5a.5.5 0 000-.708l-3.5-3.5a.5.5 0 00-.708 0z" clip-rule="evenodd"/>
</svg>`;
