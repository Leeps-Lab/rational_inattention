import csv
import random
import math
from otree.api import (
    models,
    widgets,
    BaseConstants,
    BaseSubsession,
    BaseGroup,
    BasePlayer,
    Currency as c,
    currency_range,
)
from otree_redwood.models import DecisionGroup

author = 'Your name here'

doc = """
Your app description
"""


class Constants(BaseConstants):
    name_in_url = 'rational_inattention'
    players_per_group = None
    num_rounds = 2

    endowment = 100
    default_probability = round(random.uniform(0, 1), 2)

    def get_round_number(self):
        return self.round_number

class Subsession(BaseSubsession):
    # default_probability = round(random.uniform(0, 1), 2)
    def default_probability(self):
        return round(random.uniform(0, 100))

class Group(DecisionGroup):
    pass


class Player(BasePlayer):
    # amount of money player starts with
    spend = models.FloatField(
        min=0,
        max=Constants.endowment
    )
