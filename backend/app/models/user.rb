class User < ApplicationRecord
  self.primary_key = 'uid'
  has_one_attached :profile_image

  # Rektor
  def principal?
    self.role & 32 == 32
  end

  # Administratör
  def admin?
    self.role & 16 == 16 || self.role > 16
  end

  # Vaktmästare
  def caretaker?
    self.role & 8 == 8 || self.role > 8
  end

  # Lärare
  def teacher?
    self.role & 4 == 4 || self.role > 4
  end

  # ElevHälsoTeam
  def student_health?
    self.role & 2 == 2 || self.role > 2
  end

  # Elev
  def student?
    self.role & 1 == 1
  end

end
