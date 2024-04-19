function getPrediction() {
    const dataToSend = {
        first_gpa:      document.getElementById('First Term Gpa').value,
        second_gpa:     document.getElementById('Second Term Gpa').value,
        first_language: document.querySelector('input[name="First Language"]:checked').value,
        funding:        document.getElementById('Funding').value,
        school:         document.getElementById('School').value,
        fast_track:     document.querySelector('input[name="FastTrack"]:checked').value,
        coop:           document.querySelector('input[name="Coop"]:checked').value,
        residency:      document.querySelector('input[name="Residency"]:checked').value,
        gender:         document.querySelector('input[name="Gender"]:checked').value,
        prev_edu:       document.querySelector('input[name="Previous Education"]:checked').value,
        age_gp:         document.getElementById('Age Group').value,
        highschool_avg: document.getElementById('High School Average Mark').value,
        math_score:     document.getElementById('Math Score').value,
        eng_grade:      document.getElementById('English Grade').value,
    };
    var responseClone;
    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend), // Convert the JavaScript object to a JSON string
    })
    // .then(response => response.json())
    .then(response => {
        responseClone = response.clone();
        console.log('Response Prediction:', responseClone);
        return response.json();
    })
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