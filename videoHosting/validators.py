import magic
from django.core.validators import ValidationError


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
