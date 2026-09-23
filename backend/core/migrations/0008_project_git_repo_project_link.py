from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_alter_admin_id_alter_developer_id_alter_user_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='git_repo',
            field=models.URLField(blank=True, max_length=500),
        ),
        migrations.AddField(
            model_name='project',
            name='link',
            field=models.URLField(blank=True, max_length=500),
        ),
    ]
