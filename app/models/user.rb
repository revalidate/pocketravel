class User < ActiveRecord::Base
  has_secure_password

  has_many :user_places
  has_many :places, :through => :user_places

  def self.confirm(params)
    @user = User.find_by({email: params[:email]})
    @user.try(:authenticate, params[:password])
  end
end
