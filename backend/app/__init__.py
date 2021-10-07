from flask import Flask, request, current_app
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
# from flask_login import LoginManager
from flask_babel import Babel
from flask_moment import Moment
from config import Config

db = SQLAlchemy()
migrate = Migrate()
# login = LoginManager()
# login.login_view = 'auth.login'
# login.login_message = _l('Please log in')
babel = Babel()
moment = Moment()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    # login.init_app(app)
    babel.init_app(app)
    moment.init_app(app)

    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    return app


@babel.localeselector
def get_locale():
    return request.accept_languages.best_match(current_app.config['LANGUAGES'])


from app import models
