# Set up

The Django server was set up using this tutorial: https://docs.djangoproject.com/en/4.0/intro/tutorial01/

Install environment module:

    pip install django-environ

Configure the secrets in a `mysite\.env` file:

    DJANGO_SECRET_KEY={generateYourselfAStrongUniqueSecretForYourServer}
    ELASTIC_APM_SERVER_URL={fromAPMInterface}
    ELASTIC_APM_SECRET_TOKEN={fromAPMInterface}

To run the server:

    python manage.py runserver

Site can be accessed at:

    http://localhost:8000/polls/

# Elastic APM integration

The integration documentation: https://www.elastic.co/guide/en/apm/agent/python/current/django-support.html

Debug is set to true in settings.py thus `'DEBUG': True,` was required in APM `ELASTIC_APM` setting.

To enable 404 status tracking, this value was added to the top of the `MIDDLEWARE` setting:

    'elasticapm.contrib.django.middleware.Catch404Middleware',

To show route transaction names, this was added to the `ELASTIC_APM` setting:

    'DJANGO_TRANSACTION_NAME_FROM_ROUTE': True

Logging can be configured to send errors to Elastic APM. See the integration documentation above.

Custom span and transactions can be created. See https://www.elastic.co/guide/en/apm/agent/python/current/instrumenting-custom-code.html

## RUM agent integration

Integration with the RUM Agent has not been tested but is recommended.

"To correlate performance measurement in the browser with measurements in your Django app, you can help the RUM (Real User Monitoring) agent by configuring it with the Trace ID and Span ID of the backend request."