# Set up

The Django server was set up using this tutorial: https://docs.djangoproject.com/en/4.0/intro/tutorial01/

Install environment module:

    pip install django-environ

Configure the secrets in a `mysite\.env` file:

    DJANGO_SECRET_KEY={generateYourselfAStrongUniqueSecretForYourServer}
    ELASTIC_APM_SERVER_URL={fromAPMInterface}
    ELASTIC_APM_SECRET_TOKEN={fromAPMInterface}

To enable 404 status tracking add this to the top of your `MIDDLEWARE` setting:

         'elasticapm.contrib.django.middleware.Catch404Middleware',

To run the server:

    python manage.py runserver

Site can be accessed at:

    http://localhost:8000/polls/

# Elastic APM integration

The integration documentation: https://www.elastic.co/guide/en/apm/agent/python/current/django-support.html

Debug is set to true in settings.py thus `'DEBUG': True,` was required in APM `ELASTIC_APM` setting.