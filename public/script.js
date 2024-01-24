document.getElementById('brandForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        foundationDate: document.getElementById('foundationDate').value,
        logoURL: document.getElementById('logoURL').value,
        socialLinks: document.getElementById('socialLinks').value.split(',').map(link => link.trim()),
    };

    try {
        const response = await fetch('/createBrand', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Brand created successfully:', data);
        } else {
            const errorData = await response.json();
            console.error('Error creating brand:', errorData);
        }
    } catch (error) {
        console.error('Error creating brand:', error);
    }
});