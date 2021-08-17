console.log('App loaded')

document.getElementById('uploadFileForm').addEventListener('submit', async (e) => {
   e.preventDefault();
    console.log('e', e)

    const file = e.target.querySelector('input').files[0];

    console.log('Submitted', file);

    if (file && file.size) {
        const arrayBuffer = await file.arrayBuffer();
        // const view = new Int32Array(arrayBuffer);
        const formData = new FormData(e.target);
        // formData.append('fileName', view);

        // console.log('arrayBuffer', view);
        console.log('formData', formData.values().next());

        fetch('/fileUpload', {
            method: 'post',
            body: formData
        });
    }
});

document.getElementById('uploadFileFormV2').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('e', e)

    const file = e.target.querySelector('input').files[0];

    console.log('Submitted', file);

    if (file && file.size) {
        const arrayBuffer = await file.arrayBuffer();
        const view = new Uint8Array(arrayBuffer);
        console.log('arrayBuffer', view);

        fetch('/fileUpload/v2', {
            method: 'post',
            headers: {
                'Content-Type': 'application/octet-stream'
            },
            body: view
        });
    }
});

document.getElementById('downloadFileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('e', e)

    const fileId = e.target.querySelector('input').value;

    const res = await fetch(`/files/${fileId}`, {
        method: 'get',
    });
    console.log('res', res);
    // const data = res.body;
    // const data = Object.values(await res.json());
    const reader = res.body.getReader();
    let data = [];
    let done = false;
    do {
        const r = await reader.read();
        console.log('r', r);
        done = r.done;
        if (!done) {
            data = [...data, ...r.value];
        }
    } while (!done);
    console.log('data', data);

    if (data) {
        const img = document.getElementById('downloadedImg');
        img.src = URL.createObjectURL(new Blob([new Uint8Array(data)], {type : 'image/png'}));
    }
});
