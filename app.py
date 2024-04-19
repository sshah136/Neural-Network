import pandas as pd
import numpy as np
from flask import Flask, request, render_template
import tensorflow as tf
import joblib
from os import path

app = Flask(__name__)
model = tf.keras.models.load_model('E:/OneDrive - Centennial College/Soft eng and AI/Sem V/Neural Networks/Group Project/Example 1/project_model.h5')
project_folder = r'E:\OneDrive - Centennial College\Soft eng and AI\Sem V\Neural Networks\Group Project\Final'
pipeline = joblib.load(path.join(project_folder, "pipeline.joblib"))
result = {0: "Not Persistent", 1: "Persistent"}
column_name = ['First Term Gpa', 'Second Term Gpa',
                   'First Language', 'Funding', 'School',
                   'FastTrack', 'Coop', 'Residency',
                   'Gender', 'Previous Education', 'Age Group',
                   'High School Average Mark', 'Math Score',
                   'English Grade']
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/predict', methods=['POST',"GET"])
def predict():
    data = pd.DataFrame(0, index=np.arange(1), columns=column_name) 
    #print(data)

    request_data = request.json
    #print(request_data)

    data['First Term Gpa'] = (request_data.get('first_gpa')) 
    data['Second Term Gpa'] = (request_data.get('second_gpa')) 
    data['First Language']= (request_data.get('first_language'))
    data['Funding']= (request_data.get('funding'))
    data['School']= request_data.get('school')
    data['FastTrack'] = (request_data.get('fast_track'))
    data['Coop'] = (request_data.get('coop'))
    data['Residency'] = (request_data.get('residency'))
    data['Gender'] = (request_data.get('gender'))
    data['Previous Education'] = (request_data.get('prev_edu'))
    data['Age Group'] = (request_data.get('age_gp'))
    data['High School Average Mark'] = (request_data.get('highschool_avg')) 
    data['Math Score'] = (request_data.get('math_score')) 
    data['English Grade'] = (request_data.get('eng_grade'))

     
    
    input_df = pd.DataFrame(request_data, index=[0])
    input_df = input_df.astype('float64')
    print(input_df)
    
    # Data Transformation
    preprocessed_data = pipeline.transform(input_df)
    
    # Prediction
    predictions = model.predict(preprocessed_data)
    response = {"prediction": result[(predictions[0][0] > 0.5).astype("int")]}
    return response

if __name__ == '__main__':
    app.run(debug=True) 
    
