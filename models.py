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
    num_rounds = 3
    endowment = 100
    initial_bonds = 1

    def get_round_number(self):
        return self.round_number

def parse_config(config_file):
    with open('rational_attention/configs/' + config_file) as f:
        rows = list(csv.DictReader(f))

        rounds = []
        for row in rows:
            rounds.append({
                'num_rounds': int(row['num_rounds']),
                'endowment': int(row['endowment']),
                'initial_bonds': int(row['initial_bonds']),
                'buy_option': True if row['buy_option'] == 'TRUE' else False,
                'sell_option': True if row['sell_option'] == 'TRUE' else False,
            })
        return rounds

class Subsession(BaseSubsession):
    # initial values of fields for players for each subsession
    g = models.IntegerField(initial=int(random.uniform(0, 100)))
    m = models.IntegerField(initial=int(random.uniform(0, 100)))
    y = models.IntegerField(initial=int(random.uniform(0, 100)))
    q = models.IntegerField(initial=int(random.uniform(0, 100)))
    finish = models.BooleanField(initial=False)

    @property
    def config(self):
        try:
            return parse_config(self.session.config['config_file'])[self.round_number-1]
        except IndexError:
            return None


class Group(DecisionGroup):
    pass


class Player(BasePlayer):
    # amount of money player starts with
    spend = models.FloatField(
        min=0,
        max=Constants.endowment
    )