# file_processor/views.py
from django.shortcuts import render
from django.http import JsonResponse
from .models import UploadedFile
import pandas as pd
from pandas_llm import PandasLLM
import os
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def upload_file(request):
    if request.method == 'POST':
        uploaded_file = request.FILES['file']
        file_instance = UploadedFile(file=uploaded_file)
        file_instance.save()
        return JsonResponse({'file_id': file_instance.id})
    return render(request, 'upload.html')

def process_file(request, file_id):
    file_instance = UploadedFile.objects.get(id=file_id)
    file_path = file_instance.file.path
    if file_path.endswith('.csv'):
        df = pd.read_csv(file_path)
    else:
        df = pd.read_excel(file_path)
    
    # Convert DataFrame to list of dicts
    data = df.to_dict(orient='records')
    
    return JsonResponse(data, safe=False)

@csrf_exempt
def match_and_replace(request, file_id):
    file_instance = UploadedFile.objects.get(id=file_id)
    file_path = file_instance.file.path
    df = pd.read_csv(file_path) if file_path.endswith('.csv') else pd.read_excel(file_path)

    pattern_desc = request.POST.get('pattern_desc')
    replacement = request.POST.get('replacement')

    # Manually setting the regex pattern for email addresses
    regex_pattern = r'[\w\.-]+@[\w\.-]+\.\w+'

    df = df.replace(to_replace=regex_pattern, value=replacement, regex=True)
    
    # Save the modified DataFrame back to CSV (or Excel if needed)
    if file_path.endswith('.csv'):
        df.to_csv(file_path, index=False)
    else:
        df.to_excel(file_path, index=False)

    return JsonResponse(df.to_dict())

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'csrfToken': request.META.get('CSRF_COOKIE')})
