function getPrediction() {
    const dataToSend = {
        'First Term Gpa':      document.getElementById('first_gpa').value,
        'Second Term Gpa':     document.getElementById('second_gpa').value,
        'First Language': document.querySelector('input[name="first_language"]:checked').value,
        'Funding':        document.getElementById('funding').value,
        'School':         document.getElementById('school').value,
        'FastTrack':     document.querySelector('input[name="fast_track"]:checked').value,
        'Coop':           document.querySelector('input[name="coop"]:checked').value,
        'Residency':      document.querySelector('input[name="residency"]:checked').value,
        'Gender':         document.querySelector('input[name="gender"]:checked').value,
        'Previous Education':       document.querySelector('input[name="prev_edu"]:checked').value,
        'Age Group':         document.getElementById('age_gp').value,
        'High School Average Mark': document.getElementById('highschool_avg').value,
        'Math Score':     document.getElementById('math_score').value,
        'English Grade':      document.getElementById('eng_grade').value,
    };
    fetch('http://127.0.0.1:5000/predict', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend), 
    })
    .then(response => response.json())
    .then(data => {
        // console.log('Response Prediction:', response);
        console.log('Prediction:', data.prediction);
        // Display the prediction on your web page
        document.getElementById('result').innerHTML = data.prediction
    }, function (rejectionReason) {
        console.log('Error parsing JSON from response:', rejectionReason, responseClone);
        responseClone.text()
        .then(function (bodyText) {
            console.log('Received the following instead of valid JSON:', bodyText);
        });
    })
    .catch(error => console.error('Error:', error));
}
