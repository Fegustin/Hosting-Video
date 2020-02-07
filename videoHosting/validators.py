import magic
from django.core.validators import ValidationError
from django.contrib.auth.validators import ASCIIUsernameValidator
from django.utils.translation import ugettext_lazy as _


class ValidateFileFormat:
    error_messages = {
        'content_type': "Files of type %(content_type)s are not supported.",
    }

    def __init__(self, content_types=()):
        self.content_types = content_types

    def __call__(self, data):
        if self.content_types:
            content_type_magic = magic.from_buffer(data.read(), mime=True)
            if content_type_magic not in self.content_types:
                params = {'content_type': content_type_magic}
                raise ValidationError(self.error_messages['content_type'],
                                      'content_type', params)


class UsernameValid(ASCIIUsernameValidator):
    regex = r'^[\w.@+-\\]+$'
    message = _(
        'Введите действительное имя пользователя. Это значение может содержать только английские буквы, '
        'цифры и символы \ @ /. / + / - / _.'
    )


username_validators = [UsernameValid()]
