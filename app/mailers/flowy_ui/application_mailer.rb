#
# Main application mailer
#
class FlowyUi::ApplicationMailer < ActionMailer::Base
  default from: 'from@example.com'
  layout 'mailer'
end
