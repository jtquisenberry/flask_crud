
from flask import Flask, render_template
from flask import request

app = Flask(__name__)


@app.route('/')
def hello():
    return render_template('index.html')

# ...
@app.route('/about/')
def about():
    return render_template('about.html')

# ...
@app.route('/user/')
def user():
    return render_template('user.html')

# ...
@app.route('/myform/')
def myform():
    return render_template('myform.html')

# ...
@app.route('/employee/', methods = ['GET', 'POST'])
def employee():
    my_request = request
    print(my_request)
    #l3 = app.logger
    app.logger.warning('abcd')
    return render_template('employee.html')

@app.route('/comments/')
def comments():
    comments = ['This is the first comment.',
                'This is the second comment.',
                'This is the third comment.',
                'This is the fourth comment.'
                ]

    return render_template('comments.html', comments=comments)

# app = create_app(config_name)

if __name__ == '__main__':
    app.run()