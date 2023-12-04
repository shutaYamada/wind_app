class Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

  def sign_up_params
    params.permit(:email, :password, :password_confirmation, :name, :image)
  end

  def account_update_params
    params.permit(:email, :password, :password_confirmation, :name, :image)
  end
end